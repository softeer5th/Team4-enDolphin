package endolphin.backend.global.google;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Google", description = "구글 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/google")
public class GoogleController {

    private final GoogleCalendarService googleCalendarService;


    @Operation(summary = "구글 캘린더 웹훅", description = "구글 캘린더 웹훅을 처리합니다. 프론트엔드는 이 API를 호출하지 않습니다.")
    @PostMapping("/webhook")
    public ResponseEntity<String> handleCalendarWebhook(
        @RequestHeader("X-Goog-Channel-ID") String channelId,
        @RequestHeader("X-Goog-Resource-ID") String resourceId,
        @RequestHeader("X-Goog-Resource-URI") String resourceUri,
        @RequestHeader("X-Goog-Resource-State") String resourceState,
        @RequestHeader(value = "X-Goog-Message-Number", required = false) String messageNumber,
        @RequestHeader(value = "X-Goog-Channel-Token", required = false) String channelToken,
        @RequestHeader(value = "X-Goog-Channel-Expiration", required = false) String channelExpiration
    ) {
        return googleCalendarService.processWebhookNotification(
            channelId, resourceId, resourceUri, resourceState, messageNumber, channelToken,
            channelExpiration
        );
    }
}
