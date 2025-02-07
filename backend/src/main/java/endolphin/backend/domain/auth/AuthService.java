package endolphin.backend.domain.auth;

import endolphin.backend.domain.user.UserService;
import endolphin.backend.global.google.dto.GoogleTokens;
import endolphin.backend.global.google.dto.GoogleUserInfo;
import endolphin.backend.domain.auth.dto.OAuthResponse;
import endolphin.backend.domain.auth.dto.UrlResponse;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.config.GoogleOAuthProperties;
import endolphin.backend.global.google.GoogleOAuthService;
import endolphin.backend.global.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final GoogleOAuthProperties googleOAuthProperties;
    private final GoogleOAuthService googleOAuthService;
    private final UserService userService;
    private final JwtProvider jwtProvider;

    public UrlResponse getGoogleLoginUrl() {
        return new UrlResponse(String.format(
            "%s?client_id=%s&redirect_uri=%s&response_type=code&scope=%s&access_type=offline&prompt=consent",
            googleOAuthProperties.authUrl(), googleOAuthProperties.clientId(),
            googleOAuthProperties.redirectUri(), googleOAuthProperties.scope()));
    }

    public OAuthResponse oauth2Callback(String code) {
        GoogleTokens tokenResponse = googleOAuthService.getGoogleTokens(code);
        GoogleUserInfo userInfo = googleOAuthService.getUserInfo(tokenResponse.accessToken());
        User user = userService.createUser(userInfo, tokenResponse);
        String accessToken = jwtProvider.createToken(user.getId(), user.getEmail());
        return new OAuthResponse(accessToken);
    }
}
