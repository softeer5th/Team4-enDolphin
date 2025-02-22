package endolphin.backend.global.security;

import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.*;

public class JwtAuthFilterTest {

    private JwtAuthFilter jwtAuthFilter;
    private JwtProvider jwtProvider;

    @BeforeEach
    void setUp() {
        String secretKey = "my-very-long-and-secure-secret-key-at-least-32-chars";
        jwtProvider = new JwtProvider(secretKey);
        jwtAuthFilter = new JwtAuthFilter(jwtProvider);
        ReflectionTestUtils.setField(jwtProvider, "validityInMs", 10000);
    }

    @DisplayName("토큰 검증 성공 시 사용자 정보를 설정 테스트")
    @Test
    void validTokenShouldSetUserContextInsideChain() throws Exception {
        // given
        String token = jwtProvider.createToken(123L, "test@domain.com");
        MockHttpServletRequest req = new MockHttpServletRequest();
        req.addHeader("Authorization", "Bearer " + token);
        MockHttpServletResponse res = new MockHttpServletResponse();

        // 테스트 위한 MockFilterChain
        MockFilterChain chain = new MockFilterChain() {
            @Override
            public void doFilter(ServletRequest request, ServletResponse response) {
                UserInfo user = UserContext.get();
                assertThat(user).isNotNull();
                assertThat(user.email()).isEqualTo("test@domain.com");
            }
        };

        // when
        jwtAuthFilter.doFilter(req, res, chain);

        // then
        assertThat(UserContext.get()).isNull();
    }


    @DisplayName("토큰 없을 시 401 반환 테스트")
    @Test
    void noTokenShouldReturn401() throws Exception {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();

        MockHttpServletResponse response = new MockHttpServletResponse();
        MockFilterChain chain = new MockFilterChain();

        // when
        jwtAuthFilter.doFilter(request, response, chain);

        // then
        assertThat(response.getStatus()).isEqualTo(401);
        assertThat(UserContext.get()).isNull();
    }

    @DisplayName("토큰 검증 실패 시 401 반환 테스트")
    @Test
    void invalidTokenShouldReturn401() throws Exception {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addHeader("Authorization", "Bearer invalid.token.here");

        MockHttpServletResponse response = new MockHttpServletResponse();
        MockFilterChain chain = new MockFilterChain();

        // when
        jwtAuthFilter.doFilter(request, response, chain);

        // then
        assertThat(response.getStatus()).isEqualTo(401);
        assertThat(UserContext.get()).isNull();
    }
}
