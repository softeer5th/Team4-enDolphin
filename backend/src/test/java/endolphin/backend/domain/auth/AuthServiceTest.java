package endolphin.backend.domain.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

import endolphin.backend.domain.auth.dto.OAuthResponse;
import endolphin.backend.domain.calendar.entity.Calendar;
import endolphin.backend.domain.personal_event.PersonalEventService;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.google.GoogleCalendarService;
import endolphin.backend.global.google.GoogleOAuthService;
import endolphin.backend.global.google.dto.GoogleTokens;
import endolphin.backend.global.google.dto.GoogleUserInfo;
import endolphin.backend.global.security.JwtProvider;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserService userService;

    @Mock
    private GoogleOAuthService googleOAuthService;

    @Mock
    private GoogleCalendarService googleCalendarService;

    @Mock
    private JwtProvider jwtProvider;

    @InjectMocks
    private AuthService authService;

    @Test
    @DisplayName("로그인 테스트 - 캘린더 연동 포함")
    void loginTest() {
        // Given
        String code = "test-auth-code";
        GoogleTokens googleTokens = new GoogleTokens("test-access-token", "test-refresh-token");
        GoogleUserInfo googleUserInfo = new GoogleUserInfo("test-sub", "test-name", "test-email", "test-pic");

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

        given(userService.upsertUser(any(GoogleUserInfo.class), any(GoogleTokens.class)))
            .willReturn(user);

        given(jwtProvider.createToken(user.getId(), user.getEmail()))
            .willReturn("test-jwt-token");

        // When
        OAuthResponse response = authService.login(code);

        // Then
        assertThat(response.accessToken()).isEqualTo("test-jwt-token");
    }
}
