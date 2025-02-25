package endolphin.backend.global.redis;

import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.security.PasswordEncoder;
import endolphin.backend.global.util.TimeUtil;
import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PasswordCountService {

    private final StringRedisTemplate redisStringTemplate;
    private final PasswordEncoder passwordEncoder;

    public static final int MAX_FAILED_ATTEMPTS = 5;
    private static final long LOCKOUT_DURATION_MS = 5 * 60 * 1000;

    public int tryEnter(Long userId, Discussion discussion, String password) {
        String redisKey = "failedAttempts:" + discussion.getId() + ":" + userId;

        int failedAttemptsCount = getFailedCount(redisKey);

        if (failedAttemptsCount >= MAX_FAILED_ATTEMPTS) {
            throw new ApiException(ErrorCode.TOO_MANY_FAILED_ATTEMPTS);
        }

        if (discussion.getPassword() == null || checkPassword(discussion, password)) {
            return 0;
        }

        Long updatedCount = redisStringTemplate.opsForValue().increment(redisKey);

        if (updatedCount == null) {
            throw new ApiException(ErrorCode.INTERNAL_ERROR);
        }
        redisStringTemplate.expire(redisKey, LOCKOUT_DURATION_MS, TimeUnit.MILLISECONDS);

        return updatedCount.intValue();
    }

    public LocalDateTime getExpirationTime(Long userId, Long discussionId) {
        String redisKey = "failedAttempts:" + discussionId + ":" + userId;

        if (getFailedCount(redisKey) < MAX_FAILED_ATTEMPTS) {
            return null;
        }

        long remainingTime = redisStringTemplate.getExpire(redisKey, TimeUnit.SECONDS);

        return TimeUtil.getNow().plusSeconds(remainingTime);
    }

    public int getFailedCount(String redisKey) {
        String countStr = redisStringTemplate.opsForValue().get(redisKey);
        return countStr != null ? Integer.parseInt(countStr) : 0;
    }

    private boolean checkPassword(Discussion discussion, String password) {
        if (password == null || password.isBlank()) {
            throw new ApiException(ErrorCode.PASSWORD_REQUIRED);
        }

        return passwordEncoder.matches(discussion.getId(), password, discussion.getPassword());
    }
}
