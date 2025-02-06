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

    /**
     * Logs the incoming HTTP request and its corresponding response along with processing time.
     * <p>
     * This method performs the following steps:
     * <ol>
     *   <li>Records the start time before processing the request.</li>
     *   <li>Logs the incoming request details including the HTTP method and request URI.</li>
     *   <li>Delegates request processing to the next filter in the chain via {@code filterChain.doFilter(request, response)}.</li>
     *   <li>Records the end time after processing and calculates the duration to process the request.</li>
     *   <li>Logs the outgoing response details including the HTTP method, request URI, response status, and the processing time in milliseconds.</li>
     * </ol>
     * </p>
     *
     * @param request the incoming {@link HttpServletRequest} containing the client request data
     * @param response the outgoing {@link HttpServletResponse} that carries the response data
     * @param filterChain the {@link FilterChain} to invoke the next filter or resource in the chain
     * @throws ServletException if an error occurs during the filtering process specific to the servlet
     * @throws IOException if an I/O error occurs during the processing of the request or response
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        long startTime = System.currentTimeMillis();
        log.info("Incoming Request: [{}] {}",
            request.getMethod(), request.getRequestURI());

        filterChain.doFilter(request, response);

        long endTime = System.currentTimeMillis();
        log.info("Incoming Response: [{}] {}, {},  {} ms",
            request.getMethod(), request.getRequestURI() ,
            response.getStatus(), endTime - startTime);
    }

    /**
     * Determines whether the filter should be bypassed for the incoming HTTP request.
     *
     * <p>This method checks if the request URI starts with "/api/v1". If it does not, the filter is not applied
     * and the method returns {@code true} to indicate that the request should be skipped.</p>
     *
     * @param request the HTTP servlet request to evaluate.
     * @return {@code true} if the request URI does not start with "/api/v1", indicating that the filter should not be applied;
     *         {@code false} otherwise.
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return !request.getRequestURI().startsWith("/api/v1");
    }
}
