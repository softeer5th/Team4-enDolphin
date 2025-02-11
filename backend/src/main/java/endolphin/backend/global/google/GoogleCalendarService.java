package endolphin.backend.global.google;

import endolphin.backend.domain.calendar.CalendarService;
import endolphin.backend.domain.personal_event.PersonalEventService;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.config.GoogleCalendarUrl;
import endolphin.backend.global.error.exception.CalendarException;
import endolphin.backend.global.google.dto.GoogleCalendarDto;
import endolphin.backend.global.google.dto.GoogleEvent;
import endolphin.backend.global.google.enums.GoogleEventStatus;
import endolphin.backend.global.google.enums.GoogleResourceState;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class GoogleCalendarService {

    private final RestClient restClient;
    private final GoogleCalendarUrl googleCalendarUrl;
    private final CalendarService calendarService;
    private final UserService userService;
    private final PersonalEventService personalEventService;

    public List<GoogleEvent> getCalendarEvents(String calendarId, User user) {
        try {
            String eventsUrl = googleCalendarUrl.eventsUrl().replace("{calendarId}", calendarId);

            String timeMin = LocalDateTime.now().atZone(ZoneOffset.UTC)
                .format(DateTimeFormatter.ISO_INSTANT);
            eventsUrl += "?timeMin=" + timeMin;

            Map<String, Object> response = restClient.get()
                .uri(eventsUrl)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.getAccessToken())
                .retrieve()
                .body(new ParameterizedTypeReference<>() {
                });

            List<GoogleEvent> events = new ArrayList<>();

            if (response != null && response.containsKey("items")) {
                List<Map<String, Object>> items = (List<Map<String, Object>>) response.get("items");

                for (Map<String, Object> item : items) {
                    String eventId = (String) item.get("id");
                    String summary = (String) item.getOrDefault("summary", "No Title");

                    Map<String, Object> start = (Map<String, Object>) item.get("start");
                    Map<String, Object> end = (Map<String, Object>) item.get("end");

                    LocalDateTime startDateTime = parseDateTime(start);
                    LocalDateTime endDateTime = parseDateTime(end);

                    events.add(new GoogleEvent(eventId, summary, startDateTime, endDateTime, null));
                }

                // ✅ nextSyncToken을 받아서 저장
                if (response.containsKey("nextSyncToken")) {
                    String nextSyncToken = (String) response.get("nextSyncToken");
                    calendarService.updateSyncToken(calendarId, nextSyncToken);
                }
            } else {
                throw new CalendarException(HttpStatus.BAD_REQUEST, "캘린더 이벤트 조회 실패");
            }

            return events;
        } catch (Exception e) {
            throw new CalendarException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    public List<GoogleEvent> syncWithCalendar(String calendarId, User user) {
        try {
            String syncToken = calendarService.getSyncToken(calendarId);
            String eventsUrl = googleCalendarUrl.eventsUrl().replace("{calendarId}", calendarId);

            if (syncToken != null && !syncToken.isEmpty()) {
                eventsUrl += "?syncToken=" + syncToken;
            }

            Map<String, Object> response = restClient.get()
                .uri(eventsUrl)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.getAccessToken())
                .retrieve()
                .body(new ParameterizedTypeReference<>() {
                });

            List<GoogleEvent> events = new ArrayList<>();

            if (response != null && response.containsKey("items")) {
                List<Map<String, Object>> items = (List<Map<String, Object>>) response.get("items");

                for (Map<String, Object> item : items) {
                    String eventId = (String) item.get("id");
                    String summary = (String) item.getOrDefault("summary", "No Title");
                    String status = (String) item.getOrDefault("status", "confirmed");

                    Map<String, Object> start = (Map<String, Object>) item.get("start");
                    Map<String, Object> end = (Map<String, Object>) item.get("end");

                    LocalDateTime startDateTime = parseDateTime(start);
                    LocalDateTime endDateTime = parseDateTime(end);

                    GoogleEventStatus eventStatus = GoogleEventStatus.valueOf(status);

                    events.add(
                        new GoogleEvent(eventId, summary, startDateTime, endDateTime, eventStatus));
                }

                if (response.containsKey("nextSyncToken")) {
                    String nextSyncToken = (String) response.get("nextSyncToken");
                    calendarService.updateSyncToken(calendarId, nextSyncToken);
                }
            } else {
                throw new CalendarException(HttpStatus.BAD_REQUEST, "캘린더 이벤트 조회 실패");
            }

            return events;

        } catch (Exception e) {
            // syncToken 만료 시 초기화 후 재시도 (HTTP 410 처리)
            if (e.getMessage().contains("410")) {
                calendarService.clearSyncToken(calendarId);
                return getCalendarEvents(calendarId, user);
            }
            throw new CalendarException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    public GoogleCalendarDto getPrimaryCalendar(String accessToken) {
        try {
            Map<String, Object> response = restClient.get()
                .uri(googleCalendarUrl.primaryCalendarUrl())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {
                });

            if (response != null && response.containsKey("id")) {
                String id = (String) response.get("id");
                String summary = (String) response.get("summary");
                String timeZone = (String) response.get("timeZone");
                String accessRole = (String) response.get("accessRole"); // 권한 정보

                return new GoogleCalendarDto(id, summary, timeZone, accessRole);
            } else {
                throw new CalendarException(HttpStatus.BAD_REQUEST, "Primary 캘린더 조회 실패");
            }
        } catch (Exception e) {
            throw new CalendarException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    public List<GoogleCalendarDto> getUserCalendars(String accessToken) {
        try {
            Map<String, Object> response = restClient.get()
                .uri(googleCalendarUrl.calendarListUrl())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {
                });

            List<GoogleCalendarDto> calendarDtos = new ArrayList<>();

            if (response != null && response.containsKey("items")) {
                List<Map<String, Object>> calendars = (List<Map<String, Object>>) response.get(
                    "items");

                for (Map<String, Object> calendar : calendars) {
                    String id = (String) calendar.get("id");
                    String summary = (String) calendar.get("summary");
                    String timeZone = (String) calendar.get("timeZone");
                    String accessRole = (String) calendar.get("accessRole");

                    calendarDtos.add(new GoogleCalendarDto(id, summary, timeZone, accessRole));
                }
            } else {
                throw new CalendarException(HttpStatus.BAD_REQUEST, "캘린더 목록 조회 실패");
            }

            return calendarDtos;

        } catch (Exception e) {
            throw new CalendarException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    public void subscribeToCalendar(GoogleCalendarDto calendarDto, User user) {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        // TODO: 캘린더 서비스에서 채널만료기한을 조회해서 현재 시간 이후면 구독 하지 않음
        body.add("id", UUID.randomUUID().toString());
        body.add("type", "web_hook");
        body.add("address",
            googleCalendarUrl.webhookUrl()); //TODO: 실제 도메인 엔드포인트로 변경
        body.add("token", user.getId().toString());

        long expirationTime = Instant.now().plus(Duration.ofMinutes(3)).toEpochMilli();
        body.add("expiration", expirationTime); //TODO: 구독 만료 시간 설정, 현재 테스트용으로 5분

        String calendarId = calendarDto.id();

        try {
            String subscribeUrl = googleCalendarUrl.subscribeUrl()
                .replace("{calendarId}", calendarId);

            Map<String, Object> response = restClient.post()
                .uri(subscribeUrl)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.getAccessToken())
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {
                });

            if (response != null) {
                log.info("Successfully subscribed to calendar: {}", calendarId);
            } else {
                throw new CalendarException(HttpStatus.BAD_REQUEST, "캘린더 구독 실패: " + calendarId);
            }
        } catch (Exception e) {
            throw new CalendarException(HttpStatus.FORBIDDEN, e.getMessage());
        }
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
                List<GoogleEvent> events = syncWithCalendar(calendarId, user);
                // TODO: 업데이트된 이벤트 처리 로직(personalEventService 호출)
                personalEventService.syncWithGoogleCalendar(events, user);
            } else {
                throw new CalendarException(HttpStatus.BAD_REQUEST,
                    "Unknown State: " + resourceState);
            }

            // 성공 응답 (구글의 재시도를 방지하기 위해 204 반환)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            // 5xx 에러 응답 시 구글 API가 재시도 (Exponential Backoff)
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

    private LocalDateTime parseDateTime(Map<String, Object> dateTimeMap) {
        if (dateTimeMap == null) {
            return null;
        }

        try {
            if (dateTimeMap.containsKey("dateTime")) {
                String dateTimeStr = (String) dateTimeMap.get("dateTime");
                return ZonedDateTime.parse(dateTimeStr, DateTimeFormatter.ISO_OFFSET_DATE_TIME)
                    .toLocalDateTime();
            } else if (dateTimeMap.containsKey("date")) {
                String dateStr = (String) dateTimeMap.get("date");
                return LocalDateTime.parse(dateStr + "T00:00:00");
            }
        } catch (Exception e) {
            log.warn("⚠️ DateTime 파싱 실패: {}", dateTimeMap);
        }
        return null;
    }
}
