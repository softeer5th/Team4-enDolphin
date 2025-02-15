package endolphin.backend.global.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "google.calendar.api")
public record GoogleCalendarProperties(
    int subscribeDuration
) {

}
