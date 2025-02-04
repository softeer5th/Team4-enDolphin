package endolphin.backend.domain.user;

import endolphin.backend.domain.user.dto.OAuthResponse;
import endolphin.backend.domain.user.dto.UrlResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "User", description = "사용자 관리 API")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(summary = "구글 로그인 URL", description = "구글 로그인 URL을 반환합니다.")
    @GetMapping("/api/v1/google")
    public ResponseEntity<UrlResponse> loginUrl() {
        UrlResponse response = userService.getGoogleLoginUrl();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "구글 로그인 콜백", description = "사용자가 Google 계정으로 로그인하여 JWT 토큰을 발급받습니다.")
    @GetMapping("/oauth2/callback")
    public ResponseEntity<OAuthResponse> oauthCallback(@RequestParam("code") String code) {
        OAuthResponse response = userService.oauth2Callback(code);
        return ResponseEntity.ok(response);
    }
}
