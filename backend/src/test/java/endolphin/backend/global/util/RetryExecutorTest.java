package endolphin.backend.global.util;

import static org.assertj.core.api.Assertions.*;
import static org.assertj.core.api.BDDAssertions.thenThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.never;

import endolphin.backend.domain.calendar.CalendarService;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.error.exception.CalendarException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.error.exception.OAuthException;
import endolphin.backend.global.google.GoogleOAuthService;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Supplier;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

@ExtendWith(MockitoExtension.class)
class RetryExecutorTest {

    @Mock
    private GoogleOAuthService googleOAuthService;

    @Mock
    private UserService userService;

    @Mock
    private CalendarService calendarService;

    @Mock
    private User user;

    private RetryExecutor retryExecutor;

    @BeforeEach
    public void setUp() {
        retryExecutor = new RetryExecutor(googleOAuthService, userService, calendarService);
    }


    @Test
    @DisplayName("정상 케이스: 첫 번째 시도에서 성공")
    public void testExecuteCalendarApiWithRetry_successOnFirstAttempt() {
        // Given
        Supplier<String> supplier = () -> "success";

        // When
        String result = retryExecutor.executeCalendarApiWithRetry(supplier, user, "calendarId1");

        // Then
        assertThat(result).isEqualTo("success");
    }


    @Test
    @DisplayName("OAuthException 발생 후 재시도하여 성공하는 경우")
    public void testExecuteCalendarApiWithRetry_oauthExceptionThenSuccess() {
        // Given: 첫 호출에서는 OAuthException 발생, 이후 성공
        AtomicInteger counter = new AtomicInteger(0);
        Supplier<String> supplier = () -> {
            if (counter.getAndIncrement() == 0) {
                throw new OAuthException(HttpStatus.UNAUTHORIZED, "unauthorized");
            }
            return "success";
        };

        given(user.getRefreshToken()).willReturn("refreshToken");
        given(googleOAuthService.reissueAccessToken("refreshToken")).willReturn("newToken");

        // When
        String result = retryExecutor.executeCalendarApiWithRetry(supplier, user, "calendarId1");

        // Then
        assertThat(result).isEqualTo("success");
        assertThat(counter.get()).isEqualTo(2);
        then(userService).should().updateAccessToken(user, "newToken");
    }


    @Test
    @DisplayName("GC_EXPIRED_SYNC_TOKEN 발생 후 재시도하여 성공하는 경우 (calendarId가 null이 아닌 경우)")
    public void testExecuteCalendarApiWithRetry_calendarExpiredSyncTokenThenSuccess() {
        // Given: 첫 호출에서 GC_EXPIRED_SYNC_TOKEN 오류 발생, 이후 성공
        AtomicInteger counter = new AtomicInteger(0);
        Supplier<String> supplier = () -> {
            if (counter.getAndIncrement() == 0) {
                throw new CalendarException(HttpStatus.GONE, "expired sync token");
            }
            return "success";
        };

        // When
        String result = retryExecutor.executeCalendarApiWithRetry(supplier, user, "calendarId1");

        // Then
        assertThat(result).isEqualTo("success");
        assertThat(counter.get()).isEqualTo(2);
        then(calendarService).should().clearSyncToken("calendarId1");
    }

    @Test
    @DisplayName("GC_BAD_REQUEST_ERROR 발생 시 즉시 예외 발생 (재시도 없이)")
    public void testExecuteCalendarApiWithRetry_calendarBadRequestErrorThrowsException() {
        // Given
        Supplier<String> supplier = () -> {
            throw new CalendarException(HttpStatus.BAD_REQUEST, "bad request");
        };

        // When & Then
        thenThrownBy(() -> retryExecutor.executeCalendarApiWithRetry(supplier, user, "calendarId1"))
            .isInstanceOf(CalendarException.class)
            .hasMessageContaining("bad request")
            .extracting("errorCode")
            .isEqualTo(ErrorCode.GC_BAD_REQUEST_ERROR);

        then(calendarService).should(never()).clearSyncToken(any());
    }

    @Test
    @DisplayName("GC_CONFLICT_ERROR 발생 시 즉시 예외 발생 (재시도 없이)")
    public void testExecuteCalendarApiWithRetry_calendarConflictErrorThrowsException() {
        // Given
        Supplier<String> supplier = () -> {
            throw new CalendarException(HttpStatus.CONFLICT, "conflict");
        };

        // When & Then
        thenThrownBy(() -> retryExecutor.executeCalendarApiWithRetry(supplier, user, "calendarId1"))
            .isInstanceOf(CalendarException.class)
            .hasMessageContaining("conflict")
            .extracting("errorCode")
            .isEqualTo(ErrorCode.GC_CONFLICT_ERROR);
    }

    @Test
    @DisplayName("최대 재시도 횟수를 초과하는 경우")
    public void testExecuteCalendarApiWithRetry_maxRetriesExceeded() {
        // Given: 항상 OAuthException 발생하는 경우
        Supplier<String> supplier = () -> {
            throw new OAuthException(HttpStatus.UNAUTHORIZED, "unauthorized");
        };

        given(user.getRefreshToken()).willReturn("refreshToken");
        given(googleOAuthService.reissueAccessToken("refreshToken")).willReturn("newToken");

        // When & Then
        thenThrownBy(() -> retryExecutor.executeCalendarApiWithRetry(supplier, user, "calendarId1"))
            .isInstanceOf(CalendarException.class)
            .hasMessageContaining("Retry exceeded maximum number of retries");
    }
}