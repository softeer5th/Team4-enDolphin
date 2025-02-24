package endolphin.backend.domain.auth;

import endolphin.backend.domain.auth.dto.LoginRequest;
import endolphin.backend.domain.auth.dto.OAuthResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@Tag(name = "Auth", description = "인증 관리 API")
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Value("${app.frontend.callback}")
    private String frontendCallback;

    @GetMapping("/api/v1/oauth2/callback")
    public void oauthCallback(@RequestParam("code") String code,
        HttpServletResponse response) throws IOException {
        String googleCode = authService.oauth2Callback(code);

        String redirectUrl = UriComponentsBuilder.fromUriString(frontendUrl)
            .path(frontendCallback)
            .queryParam("code", googleCode)
            .build().toUriString();

        response.sendRedirect(redirectUrl);
    }

    @Operation(summary = "로그인", description = "로그인하여 JWT 토큰을 발급받습니다.")
    @PostMapping("/api/v1/login")
    public ResponseEntity<OAuthResponse> login(@Valid @RequestBody LoginRequest request) {
        OAuthResponse response = authService.login(request.code());
        return ResponseEntity.ok(response);
    }
}
