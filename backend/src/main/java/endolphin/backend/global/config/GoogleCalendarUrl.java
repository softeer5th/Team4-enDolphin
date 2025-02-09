package endolphin.backend.global.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "google.calendar")
public record GoogleCalendarUrl(
    String calendarListUrl,
    String subscribeUrl,
    String unsubscribeUrl
) {

}
