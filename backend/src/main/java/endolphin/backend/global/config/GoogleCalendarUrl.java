package endolphin.backend.global.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "google.calendar.url")
public record GoogleCalendarUrl(
    String calendarListUrl,
    String subscribeUrl,
    String unsubscribeUrl,
    String webhookUrl,
    String primaryCalendarUrl,
    String eventsUrl,
    String updateUrl
) {

}
