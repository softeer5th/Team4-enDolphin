package endolphin.backend.global.google;

import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.config.GoogleCalendarUrl;
import endolphin.backend.global.error.exception.CalendarException;
import endolphin.backend.global.google.dto.GoogleCalendarDto;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

    public void getAllCalendarEvents(String accessToken, User user) {
        // TODO: 회원가입 시 모든 이벤트 정보 가져오기
    }

    public void getCalendarEvents(String accessToken, String calendarId, User user) {

    }

    public void subscribeToAllCalendars(String accessToken, User user) {
        List<GoogleCalendarDto> calendars = getUserCalendars(accessToken);
        for (GoogleCalendarDto calendar : calendars) {
            String calendarId = calendar.id();
            subscribeToCalendar(accessToken, calendarId, user);
        }
    }

    public List<GoogleCalendarDto> getUserCalendars(String accessToken) {
        try {
            Map<String, Object> response = restClient.get()
                .uri(googleCalendarUrl.calendarListUrl())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});

            List<GoogleCalendarDto> calendarDtos = new ArrayList<>();

            if (response != null && response.containsKey("items")) {
                List<Map<String, Object>> calendars = (List<Map<String, Object>>) response.get("items");

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

    private void subscribeToCalendar(String accessToken, String calendarId, User user) {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("id", UUID.randomUUID().toString());
        body.add("type", "web_hook");
        body.add("address", "http://localhost:8080/api/v1/google/webhook"); //TODO: 실제 도메인 엔드포인트로 변경
        body.add("token", user.getId().toString());

        try {
            String subscribeUrl = googleCalendarUrl.subscribeUrl().replace("{calendarId}", calendarId);

            Map<String, Object> response = restClient.post()
                .uri(subscribeUrl)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
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

            log.info("Successfully unsubscribed from calendar. Channel ID: {}, Resource ID: {}", channelId, resourceId);
        } catch (Exception e) {
            throw new CalendarException(HttpStatus.INTERNAL_SERVER_ERROR, "구독 해지 요청 중 오류 발생: " + e.getMessage());
        }
    }
}
