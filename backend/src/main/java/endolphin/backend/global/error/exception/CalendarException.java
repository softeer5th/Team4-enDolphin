package endolphin.backend.global.error.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CalendarException extends RuntimeException {
    private final ErrorCode errorCode;

    public CalendarException(HttpStatus status, String message) {
        super(message);

        this.errorCode = switch (status) {
            case UNAUTHORIZED -> ErrorCode.OAUTH_UNAUTHORIZED_ERROR;
            case FORBIDDEN, TOO_MANY_REQUESTS -> ErrorCode.GC_FORBIDDEN_ERROR;
            case BAD_REQUEST -> ErrorCode.GC_BAD_REQUEST_ERROR;
            case NOT_FOUND -> ErrorCode.GC_NOT_FOUND_ERROR;
            case CONFLICT -> ErrorCode.GC_CONFLICT_ERROR;
            case GONE -> ErrorCode.GC_EXPIRED_SYNC_TOKEN;
            default -> ErrorCode.GC_INTERNAL_SERVER_ERROR;
        };
    }

    public CalendarException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
