package endolphin.backend.global.redis;

import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PasswordCountService {

    private final StringRedisTemplate redisStringTemplate;

    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final long LOCKOUT_DURATION_MS = 5 * 60 * 1000;

    public void increaseCount(Long userId, Long discussionId) {
        String redisKey = "failedAttempts:" + discussionId + ":" + userId;

        String countStr = redisStringTemplate.opsForValue().get(redisKey);
        int failedAttemptsCount = countStr != null ? Integer.parseInt(countStr) : 0;

        if (failedAttemptsCount >= MAX_FAILED_ATTEMPTS) {
            throw new ApiException(ErrorCode.TOO_MANY_FAILED_ATTEMPTS);
        }

        Long updatedCount = redisStringTemplate.opsForValue().increment(redisKey);
        if (updatedCount != null) {
            redisStringTemplate.expire(redisKey, LOCKOUT_DURATION_MS, TimeUnit.MILLISECONDS);
        }
    }
}
