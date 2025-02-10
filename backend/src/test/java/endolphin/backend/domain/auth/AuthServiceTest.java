package endolphin.backend.domain.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.verify;

import endolphin.backend.domain.auth.dto.OAuthResponse;
import endolphin.backend.domain.calendar.CalendarService;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.google.GoogleCalendarService;
import endolphin.backend.global.google.GoogleOAuthService;
import endolphin.backend.global.google.dto.GoogleCalendarDto;
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
    private CalendarService calendarService;

    @Mock
    private GoogleCalendarService googleCalendarService;

    @Mock
    private JwtProvider jwtProvider;

    @InjectMocks
    private AuthService authService;

    @Test
    @DisplayName("로그인 콜백 테스트 - 캘린더 연동 포함")
    void oauth2Callback_ShouldReturnJwtTokenWithCalendarSync() {
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

        GoogleCalendarDto googleCalendarDto = new GoogleCalendarDto("primary", "Test Calendar", "for test", "Asia/Seoul");

        given(googleOAuthService.getGoogleTokens(anyString()))
            .willReturn(googleTokens);

        given(googleOAuthService.getUserInfo(anyString()))
            .willReturn(googleUserInfo);

        given(userService.upsertUser(any(GoogleUserInfo.class), any(GoogleTokens.class)))
            .willReturn(user);

        given(googleCalendarService.getPrimaryCalendar(user.getAccessToken()))
            .willReturn(googleCalendarDto);

        willDoNothing().given(calendarService).getAllEvents(any(GoogleCalendarDto.class), any(User.class));

        given(jwtProvider.createToken(user.getId(), user.getEmail()))
            .willReturn("test-jwt-token");

        // When
        OAuthResponse response = authService.oauth2Callback(code);

        // Then
        assertThat(response.accessToken()).isEqualTo("test-jwt-token");

        // ✅ 추가된 메서드 호출 검증
        verify(googleCalendarService).getPrimaryCalendar(user.getAccessToken());
        verify(googleCalendarService).subscribeToCalendar(googleCalendarDto, user);
    }
}
