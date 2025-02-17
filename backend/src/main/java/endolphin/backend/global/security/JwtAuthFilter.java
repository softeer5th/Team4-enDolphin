package endolphin.backend.global.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import jakarta.servlet.http.Cookie;

import java.io.IOException;
import org.springframework.web.filter.OncePerRequestFilter;

@RequiredArgsConstructor
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            try {
                var signedJwt = jwtProvider.validateToken(token);
                var claims = signedJwt.getPayload();

                Long userId = claims.get("userId", Long.class);
                String email = claims.get("email", String.class);

                UserInfo userInfo = new UserInfo(userId, email);

                UserContext.set(userInfo);

            } catch (RuntimeException e) {
                // 만료, 서명위조 -> 401
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                return;
            }
        } else {
            // token 없으면 -> 401
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "No token");
            return;
        }

        filterChain.doFilter(request, response);

        // 요청 끝나면 ThreadLocal 정리
        UserContext.clear();
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();

        List<String> excludedPaths = List.of(
            "/api/v1/google",
            "/api/v1/login",
            "/oauth2/callback",
            "/swagger-ui", // prod profile에서는 swagger-ui 접근 불가
            "/v3/api-docs", // prod profile에서는 v3/api-docs 접근 불가
            "/h2-console", // prod profile에서는 h2-console 접근 불가
            "/health"
        );

        Pattern invitePattern = Pattern.compile("^/api/v1/discussion/\\d+/invite$");

        return "OPTIONS".equalsIgnoreCase(request.getMethod()) ||
            excludedPaths.stream().anyMatch(path::startsWith) ||
            invitePattern.matcher(path).matches();
    }
}
