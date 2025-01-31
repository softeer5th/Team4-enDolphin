package endolphin.backend.global.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    public JwtAuthFilter(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

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
            // Authorization 헤더가 없거나 형식 불일치 -> 401
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
        return path.startsWith("/google") || path.startsWith("/oauth2/callback");
    }
}
