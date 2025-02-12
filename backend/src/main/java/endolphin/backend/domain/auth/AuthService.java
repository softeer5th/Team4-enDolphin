package endolphin.backend.domain.auth;

import endolphin.backend.domain.calendar.CalendarService;
import endolphin.backend.domain.calendar.entity.Calendar;
import endolphin.backend.domain.personal_event.PersonalEventService;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.error.exception.OAuthException;
import endolphin.backend.global.google.GoogleCalendarService;
import endolphin.backend.global.google.dto.GoogleCalendarDto;
import endolphin.backend.global.google.dto.GoogleEvent;
import endolphin.backend.global.google.dto.GoogleTokens;
import endolphin.backend.global.google.dto.GoogleUserInfo;
import endolphin.backend.domain.auth.dto.OAuthResponse;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.google.GoogleOAuthService;
import endolphin.backend.global.security.JwtProvider;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final GoogleOAuthService googleOAuthService;
    private final GoogleCalendarService googleCalendarService;
    private final CalendarService calendarService;
    private final UserService userService;
    private final JwtProvider jwtProvider;
    private final PersonalEventService personalEventService;

    @Transactional
    public OAuthResponse oauth2Callback(String code) {
        if (code == null || code.isBlank()) {
            throw new OAuthException(ErrorCode.INVALID_OAUTH_CODE);
        }
        GoogleTokens tokenResponse = googleOAuthService.getGoogleTokens(code);
        GoogleUserInfo userInfo = googleOAuthService.getUserInfo(tokenResponse.accessToken());
        validateUserInfo(userInfo);
        User user = userService.upsertUser(userInfo, tokenResponse);

        if (calendarService.isExistingCalendar(user.getId())) {
            Calendar calendar = calendarService.getCalendarByUserId(user.getId());
            if (!calendar.getChannelExpiration().isBefore(LocalDateTime.now())) {
                googleCalendarService.subscribeToCalendar(calendar.getCalendarId(), user);
            }
        } else {
            GoogleCalendarDto calendar = googleCalendarService.getPrimaryCalendar(
                user);
            calendarService.createCalendar(calendar, user);
            List<GoogleEvent> events = googleCalendarService.getCalendarEvents(calendar.id(), user);

            personalEventService.syncWithGoogleEvents(events, user);
            googleCalendarService.subscribeToCalendar(calendar.id(), user);
        }

        String accessToken = jwtProvider.createToken(user.getId(), user.getEmail());
        return new OAuthResponse(accessToken);
    }

    private void validateUserInfo(GoogleUserInfo userInfo) {
        if (userInfo == null) {
            throw new OAuthException(ErrorCode.INVALID_OAUTH_USER_INFO);
        }
        if (userInfo.email() == null || userInfo.email().isBlank()) {
            throw new OAuthException(ErrorCode.INVALID_OAUTH_USER_INFO);
        }
        if (userInfo.picture() == null || userInfo.picture().isBlank()) {
            throw new OAuthException(ErrorCode.INVALID_OAUTH_USER_INFO);
        }
    }
}
