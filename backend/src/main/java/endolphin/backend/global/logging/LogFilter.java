package endolphin.backend.global.logging;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
public class LogFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        long startTime = System.nanoTime();
        log.info("Incoming Request: [{}] {} {}",
            request.getMethod(), request.getRequestURI(),
            request.getQueryString() != null ? request.getQueryString() : "");

        filterChain.doFilter(request, response);

        long endTime = System.nanoTime();
        log.info("Incoming Response: [{}] {}, {}, {} ms",
            request.getMethod(), request.getRequestURI() ,
            response.getStatus(), (endTime - startTime) / 1_000_000.0);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return !request.getRequestURI().startsWith("/api/v1");
    }
}
