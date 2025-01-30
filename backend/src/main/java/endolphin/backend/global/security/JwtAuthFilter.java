package endolphin.backend.global.security;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthFilter implements Filter {

    private final JwtProvider jwtProvider;

    public JwtAuthFilter(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    public void doFilter(ServletRequest request,
        ServletResponse response,
        FilterChain chain)
        throws IOException, ServletException {

        HttpServletRequest httpReq = (HttpServletRequest) request;
        HttpServletResponse httpRes = (HttpServletResponse) response;

        String authHeader = httpReq.getHeader("Authorization");
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
                httpRes.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                return;
            }
        } else {
            // Authorization 헤더가 없거나 형식 불일치 -> 401
            httpRes.sendError(HttpServletResponse.SC_UNAUTHORIZED, "No token");
            return;
        }

        chain.doFilter(request, response);

        // 요청 끝나면 ThreadLocal 정리
        UserContext.clear();
    }
}
