package endolphin.backend.global.google;

import endolphin.backend.domain.calendar.CalendarService;
import endolphin.backend.domain.calendar.entity.Calendar;
import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.config.GoogleCalendarProperties;
import endolphin.backend.global.config.GoogleCalendarUrl;
import endolphin.backend.global.error.exception.CalendarException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.error.exception.OAuthException;
import endolphin.backend.global.google.dto.EventItem;
import endolphin.backend.global.google.dto.EventTime;
import endolphin.backend.global.google.dto.GoogleCalendarDto;
import endolphin.backend.global.google.dto.GoogleEvent;
import endolphin.backend.global.google.dto.GoogleEventRequest;
import endolphin.backend.global.google.dto.GoogleEventResponse;
import endolphin.backend.global.google.dto.WatchRequest;
import endolphin.backend.global.google.dto.WatchResponse;
import endolphin.backend.global.google.enums.GoogleEventStatus;
import endolphin.backend.global.google.enums.GoogleResourceState;
import endolphin.backend.global.google.event.GoogleEventChanged;
import endolphin.backend.global.util.RetryExecutor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class GoogleCalendarService {

    private final RestClient restClient;
    private final GoogleCalendarUrl googleCalendarUrl;
    private final CalendarService calendarService;
    private final UserService userService;
    private final GoogleCalendarProperties googleCalendarProperties;
    private final ApplicationEventPublisher eventPublisher;

    private final RetryExecutor retryExecutor;

    public void upsertGoogleCalendar(User user) {
        if (calendarService.isExistingCalendar(user.getId())) {
            Calendar calendar = calendarService.getCalendarByUserId(user.getId());
            subscribeToCalendar(calendar, user);
        } else {
            GoogleCalendarDto googleCalendarDto = getPrimaryCalendar(
                user);
            Calendar calendar = calendarService.createCalendar(googleCalendarDto, user);
            getCalendarEvents(googleCalendarDto.id(), user);
            subscribeToCalendar(calendar, user);
        }
    }

    public void insertPersonalEvents(List<PersonalEvent> personalEvents) {
        for (PersonalEvent personalEvent : personalEvents) {
            insertPersonalEventToGoogleCalendar(personalEvent);
        }
    }

    public void insertPersonalEventToGoogleCalendar(PersonalEvent personalEvent) {
        String eventUrl = googleCalendarUrl.eventsUrl()
            .replace("{calendarId}", personalEvent.getCalendarId());
        User user = personalEvent.getUser();

        GoogleEventRequest body = GoogleEventRequest.of(personalEvent,
            personalEvent.getGoogleEventId());

        retryExecutor.executeCalendarApiWithRetry(
            () -> {
                restClient.post()
                    .uri(eventUrl)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.getAccessToken())
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .body(body)
                    .exchange((request, response) -> {
                        if (response.getStatusCode().is2xxSuccessful()) {
                            return Optional.empty();
                        }
                        log.error("Invalid request: {}", response.bodyTo(String.class));
                        if (response.getStatusCode().isSameCodeAs(HttpStatus.UNAUTHORIZED)) {
                            throw new OAuthException(ErrorCode.OAUTH_UNAUTHORIZED_ERROR);
                        }

                        throw new CalendarException((HttpStatus) response.getStatusCode(),
                            response.bodyTo(String.class));
                    });
                log.info("[insertPersonalEventToGoogleCalendar] success: ");

                return true;
            }, user, personalEvent.getCalendarId()
        );
    }

    public void updatePersonalEventToGoogleCalendar(PersonalEvent personalEvent) {
        String eventUrl = String.format(googleCalendarUrl.updateUrl(),
            personalEvent.getCalendarId(), personalEvent.getGoogleEventId());
        User user = personalEvent.getUser();
        String token = user.getAccessToken();

        GoogleEventRequest body = GoogleEventRequest.of(personalEvent,
            personalEvent.getGoogleEventId());

        retryExecutor.executeCalendarApiWithRetry(
            () -> {
                restClient.put()
                    .uri(eventUrl)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .body(body)
                    .exchange((request, response) -> {
                        if (response.getStatusCode().is2xxSuccessful()) {
                            return Optional.empty();
                        }
                        log.error("Invalid request: {}", response.bodyTo(String.class));
                        if (response.getStatusCode().isSameCodeAs(HttpStatus.UNAUTHORIZED)) {
                            throw new OAuthException(ErrorCode.OAUTH_UNAUTHORIZED_ERROR);
                        }

                        throw new CalendarException((HttpStatus) response.getStatusCode(),
                            response.bodyTo(String.class));
                    });
                log.info("[updatePersonalEventToGoogleCalendar] success: ");

                return true;
            }, user, personalEvent.getCalendarId()
        );
    }

    public void deletePersonalEventFromGoogleCalender(PersonalEvent personalEvent) {
        String eventUrl = String.format(googleCalendarUrl.updateUrl(),
            personalEvent.getCalendarId(), personalEvent.getGoogleEventId());
        User user = personalEvent.getUser();
        String token = user.getAccessToken();

        retryExecutor.executeCalendarApiWithRetry(
            () -> {
                restClient.delete()
                    .uri(eventUrl)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                    .exchange((request, response) -> {
                        if (response.getStatusCode().is2xxSuccessful()) {
                            return Optional.empty();
                        }
                        log.error("Invalid request: {}", response.bodyTo(String.class));
                        if (response.getStatusCode().isSameCodeAs(HttpStatus.UNAUTHORIZED)) {
                            throw new OAuthException(ErrorCode.OAUTH_UNAUTHORIZED_ERROR);
                        }
                        if (response.getStatusCode().isSameCodeAs(HttpStatus.GONE)) {
                            throw new CalendarException(ErrorCode.GC_GONE_ERROR,
                                response.bodyTo(String.class));
                        }

                        throw new CalendarException((HttpStatus) response.getStatusCode(),
                            response.bodyTo(String.class));
                    });
                log.info("[deletePersonalEventFromGoogleCalender] success: ");

                return true;
            }, user, personalEvent.getCalendarId()
        );
    }

    public void getCalendarEvents(String calendarId, User user) {
        String eventsUrl = googleCalendarUrl.eventsUrl().replace("{calendarId}", calendarId);

        String timeMin = LocalDateTime.now().atZone(ZoneOffset.UTC)
            .format(DateTimeFormatter.ISO_INSTANT);

        StringBuilder sb = new StringBuilder(eventsUrl);
        sb.append("?timeMin=").append(timeMin);
        sb.append("&timeZone=").append(googleCalendarProperties.timeZone());

        retryExecutor.executeCalendarApiWithRetry(
            () -> {
                GoogleEventResponse result = restClient.get()
                    .uri(sb.toString())
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.getAccessToken())
                    .exchange((request, response) -> {
                        if (response.getStatusCode().is2xxSuccessful()) {
                            return response.bodyTo(GoogleEventResponse.class);
                        }
                        log.error("Invalid request: {}", response.bodyTo(String.class));
                        if (response.getStatusCode().isSameCodeAs(HttpStatus.UNAUTHORIZED)) {
                            throw new OAuthException(ErrorCode.OAUTH_UNAUTHORIZED_ERROR);
                        }
                        throw new CalendarException((HttpStatus) response.getStatusCode(),
                            response.bodyTo(String.class));
                    });
                log.info("[getCalendarEvents] success: {}", result);
                List<GoogleEvent> events = extractEventList(result);

                extractSyncToken(calendarId, result);

                eventPublisher.publishEvent(new GoogleEventChanged(events, user, calendarId));
                return true;
            }, user, calendarId
        );
    }

    public void syncWithCalendar(String calendarId, User user) {
        String syncToken = calendarService.getSyncToken(calendarId);
        String eventsUrl = googleCalendarUrl.eventsUrl().replace("{calendarId}", calendarId);

        if (syncToken == null || syncToken.isEmpty()) {
            getCalendarEvents(calendarId, user);
        }
        StringBuilder sb = new StringBuilder(eventsUrl);
        sb.append("?syncToken=").append(syncToken);
        sb.append("&timeZone=").append(googleCalendarProperties.timeZone());
        log.info("[syncWithCalendar] syncing user {} with token: {}",user.getName(), syncToken);

        retryExecutor.executeCalendarApiWithRetry(
            () -> {
                GoogleEventResponse result = restClient.get()
                    .uri(sb.toString())
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.getAccessToken())
                    .exchange((request, response) -> {
                        if (response.getStatusCode().is2xxSuccessful()) {
                            return response.bodyTo(GoogleEventResponse.class);
                        }
                        log.error("Invalid request: {}", response.bodyTo(String.class));
                        if (response.getStatusCode().isSameCodeAs(HttpStatus.UNAUTHORIZED)) {
                            throw new OAuthException(ErrorCode.OAUTH_UNAUTHORIZED_ERROR);
                        }
                        if (response.getStatusCode().isSameCodeAs(HttpStatus.GONE)) {
                            throw new CalendarException(ErrorCode.GC_EXPIRED_SYNC_TOKEN,
                                response.bodyTo(String.class));
                        }

                        throw new CalendarException((HttpStatus) response.getStatusCode(),
                            response.bodyTo(String.class));
                    });
                List<GoogleEvent> events = extractEventList(result);
                log.info("[syncWithCalendar] before publish event, calId: {}, userId: {}", calendarId, user.getId());
                eventPublisher.publishEvent(new GoogleEventChanged(events, user, calendarId));
                return true;
            }, user, calendarId
        );
    }

    public GoogleCalendarDto getPrimaryCalendar(User user) {
        String accessToken = user.getAccessToken();

        return retryExecutor.executeCalendarApiWithRetry(
            () -> {
                GoogleCalendarDto result = restClient.get()
                    .uri(googleCalendarUrl.primaryCalendarUrl())
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                    .exchange((request, response) -> {
                        if (response.getStatusCode().is2xxSuccessful()) {
                            return response.bodyTo(GoogleCalendarDto.class);
                        }
                        log.error("Invalid request: {}", response.bodyTo(String.class));
                        if (response.getStatusCode().isSameCodeAs(HttpStatus.UNAUTHORIZED)) {
                            throw new OAuthException(ErrorCode.OAUTH_UNAUTHORIZED_ERROR);
                        }
                        throw new CalendarException((HttpStatus) response.getStatusCode(),
                            response.bodyTo(String.class));
                    });
                log.info("[getPrimaryCalendar] success: {}", result);
                return result;
            }, user, null
        );
    }

    public void subscribeToCalendar(Calendar calendar, User user) {
        if (calendar.getChannelExpiration() != null && !calendar.getChannelExpiration()
            .isBefore(LocalDateTime.now())) {
            return;
        }
        String subscribeUrl = googleCalendarUrl.subscribeUrl()
            .replace("{calendarId}", calendar.getCalendarId());

        WatchRequest body = WatchRequest.of(UUID.randomUUID().toString(),
            googleCalendarUrl.webhookUrl(),
            user.getId().toString(),
            String.valueOf(googleCalendarProperties.subscribeDuration() * 60));

        retryExecutor.executeCalendarApiWithRetry(
            () -> {
                WatchResponse result = restClient.post()
                    .uri(subscribeUrl)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.getAccessToken())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .exchange((request, response) -> {
                        if (response.getStatusCode().is2xxSuccessful()) {
                            return response.bodyTo(WatchResponse.class);
                        }
                        log.error("Invalid request: {}", response.bodyTo(String.class));
                        if (response.getStatusCode().isSameCodeAs(HttpStatus.UNAUTHORIZED)) {
                            throw new OAuthException(ErrorCode.OAUTH_UNAUTHORIZED_ERROR);
                        }
                        throw new CalendarException((HttpStatus) response.getStatusCode(),
                            response.bodyTo(String.class));
                    });
                log.info("[subscribeToCalendar] success: {}", result);

                return true;
            }, user, calendar.getCalendarId()
        );
    }

    public ResponseEntity<String> processWebhookNotification(
        String channelId,
        String resourceId,
        String resourceUri,
        String resourceState,
        String messageNumber,
        String channelToken,
        String channelExpiration
    ) {
        try {
            log.info("✅ Webhook Received:");

            Long userId = parseUserId(channelToken);

            String calendarId = parseCalendarId(resourceUri);

            if (GoogleResourceState.SYNC.getValue().equals(resourceState)) {
                log.info("🔄 [SYNC] Resource ID: {}, Channel ID: {}, User ID: {}, expiration : {}",
                    resourceId,
                    channelId, userId, channelExpiration);
                calendarService.setWebhookProperties(calendarId, resourceId, channelId,
                    channelExpiration);
            } else if (GoogleResourceState.EXISTS.getValue().equals(resourceState)) {
                log.info("📅 [EXISTS] Calendar ID: {}, User ID: {}", calendarId, userId);

                User user = userService.getUser(userId);
                syncWithCalendar(calendarId, user);

            } else {
                throw new CalendarException(HttpStatus.BAD_REQUEST,
                    "Unknown State: " + resourceState);
            }

            // 성공 응답 (구글의 재시도를 방지하기 위해 204 반환)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            // 5xx 에러 응답 시 구글 API가 재시도 (Exponential Backoff)
            log.error("[processWebhookNotification], {}", e.getMessage());

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Long parseUserId(String channelToken) {
        try {
            return Long.parseLong(channelToken);
        } catch (NumberFormatException e) {
            throw new CalendarException(HttpStatus.BAD_REQUEST,
                "Invalid channel token format on webhook.");
        }
    }

    private String parseCalendarId(String resourceUri) {
        try {
            String[] parts = resourceUri.split("/calendars/");
            if (parts.length > 1) {
                return parts[1].split("/")[0];
            } else {
                throw new CalendarException(HttpStatus.BAD_REQUEST, "Invalid resource URI format.");
            }
        } catch (Exception e) {
            throw new CalendarException(HttpStatus.BAD_REQUEST,
                "Failed to parse calendarId from resourceUri on webhook.");
        }
    }

    private void extractSyncToken(String calendarId, GoogleEventResponse result) {
        if (result.nextSyncToken() != null) {
            String nextSyncToken = result.nextSyncToken();
            calendarService.updateSyncToken(calendarId, nextSyncToken);
        } else {
            throw new CalendarException(HttpStatus.BAD_REQUEST, "캘린더 이벤트 조회 실패");
        }
    }

    private List<GoogleEvent> extractEventList(GoogleEventResponse result) {
        if (result == null || result.items() == null) {
            throw new CalendarException(ErrorCode.GC_NOT_FOUND_ERROR);
        }

        List<GoogleEvent> events = new ArrayList<>();
        for (EventItem item : result.items()) {

            String eventId = item.id();
            GoogleEventStatus status = GoogleEventStatus.fromValue(item.status());
            String summary = null;
            LocalDateTime startDateTime = null;
            LocalDateTime endDateTime = null;
            if (status == GoogleEventStatus.CONFIRMED) {
                summary = item.summary() == null ? "제목 없음" : item.summary();
                startDateTime = convertLocalDateTime(item.start());
                endDateTime = convertLocalDateTime(item.end());
            }

            events.add(new GoogleEvent(eventId, summary, startDateTime, endDateTime, status));
        }
        return events;
    }

    private LocalDateTime convertLocalDateTime(EventTime eventTime) {
        if (eventTime == null) {
            return null;
        }
        if (eventTime.date() == null) {
            return LocalDateTime.parse(eventTime.dateTime(), DateTimeFormatter.ISO_DATE_TIME);
        }
        LocalDate date = LocalDate.parse(eventTime.date(), DateTimeFormatter.ISO_DATE);
        return date.atStartOfDay();
    }
}
