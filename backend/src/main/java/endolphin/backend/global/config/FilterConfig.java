package endolphin.backend.global.config;

import endolphin.backend.global.logging.LogFilter;
import endolphin.backend.global.security.JwtAuthFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    /**
     * Creates and registers a FilterRegistrationBean for the LogFilter.
     *
     * <p>This method initializes a new instance of {@link LogFilter}, configures it to intercept all URL
     * patterns ("/*"), and assigns it an execution order of 1. Setting the order ensures that the LogFilter
     * is invoked before filters with higher order values.</p>
     *
     * @return a {@code FilterRegistrationBean} configured with a {@link LogFilter} instance and URL pattern "/*"
     */
    @Bean
    public FilterRegistrationBean<LogFilter> logFilterFilterRegistrationBean() {
        FilterRegistrationBean<LogFilter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new LogFilter());
        filterRegistrationBean.addUrlPatterns("/*");
        filterRegistrationBean.setOrder(1);
        return filterRegistrationBean;
    }

    /**
     * Registers the JWT authentication filter with the application's filter chain.
     *
     * <p>This method creates and configures a {@link FilterRegistrationBean} for the provided
     * {@link JwtAuthFilter}. The filter is applied to all URL patterns ("/*") and assigned an order
     * of 2, ensuring its execution after filters with lower order values.
     *
     * @param filter the JWT authentication filter instance to be registered
     * @return a configured {@link FilterRegistrationBean} for the JWT authentication filter
     */
    @Bean
    public FilterRegistrationBean<JwtAuthFilter> jwtAuthFilterRegistration(JwtAuthFilter filter) {
        FilterRegistrationBean<JwtAuthFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(filter);
        registration.addUrlPatterns("/*");
        registration.setOrder(2);
        return registration;
    }
}
