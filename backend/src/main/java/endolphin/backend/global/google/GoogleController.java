package endolphin.backend.global.google;

import endolphin.backend.domain.auth.dto.UrlResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class GoogleController {

    private final GoogleOAuthService googleOAuthService;
    private final GoogleCalendarService googleCalendarService;

    @Operation(summary = "구글 로그인 URL", description = "구글 로그인 URL을 반환합니다.")
    @GetMapping("/api/v1/google")
    public ResponseEntity<UrlResponse> loginUrl() {
        UrlResponse response = googleOAuthService.getGoogleLoginUrl();
        return ResponseEntity.ok(response);
    }
}
