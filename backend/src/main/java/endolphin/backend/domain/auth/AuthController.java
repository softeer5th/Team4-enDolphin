package endolphin.backend.domain.auth;

import endolphin.backend.domain.auth.dto.OAuthResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Auth", description = "인증 관리 API")
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "구글 로그인 콜백", description = "사용자가 Google 계정으로 로그인하여 JWT 토큰을 발급받습니다.")
    @GetMapping("/oauth2/callback")
    public void oauthCallback(@RequestParam("code") String code,
        HttpServletResponse response) throws IOException {
        OAuthResponse oAuthResponse = authService.oauth2Callback(code);

        Cookie cookie = new Cookie("accessToken", oAuthResponse.accessToken());
        cookie.setHttpOnly(true);
        cookie.setMaxAge(60 * 60);
        cookie.setPath("/");
        response.addCookie(cookie);

        response.sendRedirect("http://localhost:5173");
    }
}
