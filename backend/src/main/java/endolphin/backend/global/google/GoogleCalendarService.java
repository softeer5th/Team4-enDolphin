package endolphin.backend.global.google;

import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.config.GoogleCalendarUrl;
import endolphin.backend.global.error.exception.CalendarException;
import endolphin.backend.global.google.dto.GoogleCalendarDto;
import java.time.Duration;
import java.time.Instant;
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

    public void getAllCalendarEvents(User user) {
        // TODO: 회원가입 시 모든 이벤트 정보 가져오기
    }

    public void getCalendarEvents(String calendarId, User user) {

    }

    public void subscribeToAllCalendars(String accessToken, User user) {
        List<GoogleCalendarDto> calendars = getUserCalendars(accessToken);
        for (GoogleCalendarDto calendar : calendars) {
            subscribeToCalendar(calendar, user);
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
                // Primary 캘린더 정보 추출
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
        body.add("id", UUID.randomUUID().toString());
        body.add("type", "web_hook");
        body.add("address",
            googleCalendarUrl.webhookUrl()); //TODO: 실제 도메인 엔드포인트로 변경
        body.add("token", user.getId().toString());

        long expirationTime = Instant.now().plus(Duration.ofMinutes(1)).toEpochMilli();
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

    public void unsubscribeFromCalendar(String accessToken, String channelId, String resourceId) {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("id", channelId);
        body.add("resourceId", resourceId);

        try {
            restClient.post()
                .uri(googleCalendarUrl.unsubscribeUrl())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .toBodilessEntity();

            log.info("Successfully unsubscribed from calendar. Channel ID: {}, Resource ID: {}",
                channelId, resourceId);
        } catch (Exception e) {
            throw new CalendarException(HttpStatus.INTERNAL_SERVER_ERROR,
                "구독 해지 요청 중 오류 발생: " + e.getMessage());
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

            if ("sync".equals(resourceState)) {
                log.info("🔄 [SYNC] Resource ID: {}, Channel ID: {}, User ID: {}", resourceId,
                    channelId, userId);
                // TODO: 동기화 시 db에 channelId, resourceId, channelExpiration 저장
            } else if ("exists".equals(resourceState)) {
                log.info("📅 [EXISTS] Calendar ID: {}, User ID: {}", calendarId, userId);
                // TODO: 업데이트된 이벤트 처리 로직
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
}
