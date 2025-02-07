package endolphin.backend.domain.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

import endolphin.backend.domain.auth.dto.OAuthResponse;
import endolphin.backend.domain.auth.dto.UrlResponse;
import endolphin.backend.domain.user.UserRepository;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.global.google.dto.GoogleTokens;
import endolphin.backend.global.google.dto.GoogleUserInfo;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.config.GoogleOAuthProperties;
import endolphin.backend.global.google.GoogleOAuthService;
import endolphin.backend.global.security.JwtProvider;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private GoogleOAuthProperties googleOAuthProperties;

    @Mock
    private UserService userService;

    @Mock
    private GoogleOAuthService googleOAuthService;

    @Mock
    private JwtProvider jwtProvider;

    @InjectMocks
    private AuthService authService;

    private final String testAuthUrl = "https://accounts.google.com/o/oauth2/auth";
    private final String testClientId = "test-client-id";
    private final String testRedirectUri = "http://localhost:8080/test/callback";
    private final String testScope = "email profile";

    @Test
    @DisplayName("구글 로그인 url 반환 테스트")
    void getGoogleLoginUrl_ShouldReturnCorrectUrl() {
        given(googleOAuthProperties.clientId()).willReturn(testClientId);
        given(googleOAuthProperties.redirectUri()).willReturn(testRedirectUri);
        given(googleOAuthProperties.authUrl()).willReturn(testAuthUrl);
        given(googleOAuthProperties.scope()).willReturn(testScope);
        UrlResponse urlResponse = authService.getGoogleLoginUrl();
        assertThat(urlResponse.url()).isEqualTo(
            testAuthUrl + "?client_id=" + testClientId + "&redirect_uri=" + testRedirectUri
                + "&response_type=code&scope=" + testScope + "&access_type=offline&prompt=consent"
        );
    }

    @Test
    @DisplayName("로그인 콜백 테스트")
    void oauth2Callback_ShouldReturnJwtToken() {
        // Given
        String code = "test-auth-code";
        GoogleTokens googleTokens = new GoogleTokens("test-access-token", "test-refresh-token");
        GoogleUserInfo googleUserInfo = new GoogleUserInfo("test-sub", "test-name", "test-email",
            "test-pic");

        User user = User.builder()
            .email(googleUserInfo.email())
            .name(googleUserInfo.name())
            .picture(googleUserInfo.picture())
            .accessToken(googleTokens.accessToken())
            .refreshToken(googleTokens.refreshToken())
            .build();

        given(googleOAuthService.getGoogleTokens(anyString()))
            .willReturn(googleTokens);

        given(googleOAuthService.getUserInfo(anyString()))
            .willReturn(googleUserInfo);

        given(userService.createUser(any(GoogleUserInfo.class), any(GoogleTokens.class)))
            .willReturn(user);
        given(jwtProvider.createToken(user.getId(), user.getEmail())).willReturn("test-jwt-token");

        // When
        OAuthResponse response = authService.oauth2Callback(code);

        // Then
        assertThat(response.accessToken()).isEqualTo("test-jwt-token");
    }
}