package endolphin.backend.global.util;

import endolphin.backend.domain.calendar.CalendarService;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.error.exception.CalendarException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.error.exception.OAuthException;
import endolphin.backend.global.google.GoogleOAuthService;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.Supplier;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class RetryExecutor {
    private final GoogleOAuthService googleOAuthService;
    private final UserService userService;
    private final CalendarService calendarService;

    private static final int MAX_RETRIES = 3;
    private static final long INITIAL_DELAY_MS = 1000;

    public <T> T executeCalendarApiWithRetry(Supplier<T> action, User user, String calendarId) {
        int attempts = 0;
        long delay = INITIAL_DELAY_MS;
        while(true) {
            try {
                return action.get();
            } catch (OAuthException e) {
                log.error("OAuth exception: {}", e.getMessage());
                if (e.getErrorCode() == ErrorCode.OAUTH_UNAUTHORIZED_ERROR) {
                    String newAccessToken = googleOAuthService.reissueAccessToken(user.getRefreshToken());
                    userService.updateAccessToken(user, newAccessToken);
                }
            } catch (CalendarException e) {
                log.error("Calendar exception: {}", e.getMessage());
                if (switch (e.getErrorCode()) {
                    case GC_EXPIRED_SYNC_TOKEN -> {
                        if (calendarId != null) {
                            calendarService.clearSyncToken(calendarId);
                        }
                        yield false;
                    }
                    case GC_BAD_REQUEST_ERROR, GC_CONFLICT_ERROR, GC_GONE_ERROR -> true;
                    default -> false;
                }) {
                    log.error("Unexpected error occurred {}", e.getMessage());
                    throw e;
                }
            }
            attempts++;
            log.info("Retry attempt {}/{}", attempts, MAX_RETRIES);
            log.info("delay {} ms", delay);
            try {
                Thread.sleep(delay);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new CalendarException(HttpStatus.INTERNAL_SERVER_ERROR, "Retry interrupted");
            }
            delay =  INITIAL_DELAY_MS * (long) Math.pow(2, attempts);
            delay += ThreadLocalRandom.current().nextLong(delay);
            if (attempts >= MAX_RETRIES - 1) {
                log.error("Retry exceeded maximum number of retries: username: {}, calendarId: {}",
                    user.getName(), calendarId);
                throw new CalendarException(HttpStatus.INTERNAL_SERVER_ERROR, "Retry exceeded maximum number of retries");
            }
        }

    }

}
