package endolphin.backend.global.google;

import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.error.exception.CalendarException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CalendarService {

    private final RestTemplate restTemplate;

    public void syncUserCalendarEvents(String accessToken, User user) {
        // TODO: 최초 로그인 시 Personal Event 동기화
    }

    public void subscribeToAllCalendars(String accessToken, User user) {
        List<Map<String, Object>> calendars = getUserCalendars(accessToken);
        for (Map<String, Object> calendar : calendars) {
            String calendarId = (String) calendar.get("id");
            subscribeToCalendar(accessToken, calendarId, user);
        }
    }

    private List<Map<String, Object>> getUserCalendars(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                "https://www.googleapis.com/calendar/v3/users/me/calendarList",
                HttpMethod.GET,
                entity,
                Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Object items = response.getBody().get("items");
                if (items instanceof List<?>) {
                    return (List<Map<String, Object>>) items;
                }
            }
            throw new CalendarException(HttpStatus.BAD_REQUEST, "캘린더 목록 조회 실패");

        } catch (Exception e) {
            throw new CalendarException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    private void subscribeToCalendar(String accessToken, String calendarId, User user) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("id", UUID.randomUUID().toString());
        body.add("type", "web_hook");
        body.add("address", "http://localhost:8080/webhook"); //TODO: 실제 도메인 엔드포인트로 변경
        body.add("token", user.getId().toString());

        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                "https://www.googleapis.com/calendar/v3/calendars/" + calendarId + "/events/watch",
                request,
                Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                log.info("Successfully subscribed to calendar: {}", calendarId);
            } else {
                throw new CalendarException((HttpStatus) response.getStatusCode(),
                    "캘린더 구독 실패: " + calendarId);
            }
        } catch (Exception e) {
            throw new CalendarException(HttpStatus.FORBIDDEN, e.getMessage());
        }
    }
}
