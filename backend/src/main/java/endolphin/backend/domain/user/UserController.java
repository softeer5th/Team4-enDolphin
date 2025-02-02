package endolphin.backend.domain.user;

import endolphin.backend.domain.user.dto.OAuthResponse;
import endolphin.backend.domain.user.dto.UrlResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/api/v1/google")
    public ResponseEntity<UrlResponse> loginUrl() {
        UrlResponse response = userService.getGoogleLoginUrl();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/oauth2/callback")
    public ResponseEntity<OAuthResponse> oauthCallback(@RequestParam("code") String code) {
        OAuthResponse response = userService.oauth2Callback(code);
        return ResponseEntity.ok(response);
    }
}
