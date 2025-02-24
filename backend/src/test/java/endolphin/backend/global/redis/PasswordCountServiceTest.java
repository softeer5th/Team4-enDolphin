package endolphin.backend.global.redis;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import endolphin.backend.global.error.exception.ApiException;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(MockitoExtension.class)
public class PasswordCountServiceTest {

    @Mock
    private StringRedisTemplate redisStringTemplate;

    @Mock
    private ValueOperations<String, String> valueOperations;

    private PasswordCountService passwordCountService;

    @BeforeEach
    public void setUp() {
        // StringRedisTemplate의 opsForValue() 호출 시 mock ValueOperations 반환
        when(redisStringTemplate.opsForValue()).thenReturn(valueOperations);
        passwordCountService = new PasswordCountService(redisStringTemplate);
    }

    @Test
    public void testIncreaseCount_Success_FirstFailure() {
        Long userId = 1L;
        Long discussionId = 1L;
        String redisKey = "failedAttempts:" + discussionId + ":" + userId;

        // 이전에 값이 없으면 null 반환 (즉, 첫 실패)
        when(valueOperations.get(redisKey)).thenReturn(null);
        // 증가 후 값으로 1 반환
        when(valueOperations.increment(redisKey)).thenReturn(1L);

        passwordCountService.increaseCount(userId, discussionId);

        // 첫 실패시 expire가 설정되어야 함 (5분 = 5*60*1000 밀리초)
        verify(redisStringTemplate).expire(eq(redisKey), eq(5 * 60 * 1000L), eq(TimeUnit.MILLISECONDS));
    }

    @Test
    public void testIncreaseCount_Success_SubsequentFailure() {
        Long userId = 2L;
        Long discussionId = 10L;
        String redisKey = "failedAttempts:" + discussionId + ":" + userId;

        when(valueOperations.get(redisKey)).thenReturn("2");

        when(valueOperations.increment(redisKey)).thenReturn(3L);

        passwordCountService.increaseCount(userId, discussionId);
    }

    @Test
    public void testIncreaseCount_ExceedsMaxAttempts() {
        Long userId = 3L;
        Long discussionId = 20L;
        String redisKey = "failedAttempts:" + discussionId + ":" + userId;

        when(valueOperations.get(redisKey)).thenReturn("5");

        ApiException exception = assertThrows(ApiException.class, () ->
            passwordCountService.increaseCount(userId, discussionId)
        );

    }
}
