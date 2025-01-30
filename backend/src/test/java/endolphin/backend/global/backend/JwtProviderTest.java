package endolphin.backend.global.backend;

import endolphin.backend.global.security.JwtProvider;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

public class JwtProviderTest {

    private JwtProvider jwtProvider;

    @BeforeEach
    void setUp() {
        String secretKey = "my-very-long-and-secure-secret-key-which-is-at-least-32-chars";
        jwtProvider = new JwtProvider(secretKey);
    }

    @DisplayName("토큰 생성 및 검증 테스트")
    @Test
    void createAndValidateToken() {
        // given
        Long userId = 123L;
        String email = "test@example.com";

        // when
        String token = jwtProvider.createToken(userId, email);

        // then
        assertThat(token).isNotNull();

        // when
        Jws<Claims> parsed = jwtProvider.validateToken(token);
        Claims claims = parsed.getPayload();

        // then
        assertThat(claims.get("userId", Long.class)).isEqualTo(userId);
        assertThat(claims.get("email", String.class)).isEqualTo(email);
    }

    @DisplayName("유효하지 않은 토큰 테스트")
    @Test
    void invalidTokenShouldThrow() {
        // given
        String invalidToken = "abc.def.ghi";

        // when & then
        assertThatThrownBy(() -> jwtProvider.validateToken(invalidToken))
            .isInstanceOf(RuntimeException.class)
            .hasMessageContaining("Invalid or expired JWT token");
    }
}
