package endolphin.backend.global.redis;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

@SpringBootTest
public class RedisTemplateTest {

    @Autowired
    private RedisTemplate<String, byte[]> redisTemplate;

    @DisplayName("작성한 Redis template 테스트")
    @Test
    public void testSetAndGetByteArray() {
        String key = "test:bytearray";
        byte[] expected = new byte[] {10, 20, 30, 40, 50};

        // 값 저장
        redisTemplate.opsForValue().set(key, expected);

        // 값 조회
        byte[] actual = redisTemplate.opsForValue().get(key);

        assertThat(actual).isEqualTo(expected);
    }
}
