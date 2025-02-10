package endolphin.backend.global.error.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CalendarException extends RuntimeException {
    private final ErrorCode errorCode;

    public CalendarException(HttpStatus status, String message) {
        super(message);

        switch (status) {
            case UNAUTHORIZED -> errorCode = ErrorCode.CALENDAR_UNAUTHORIZED_ERROR;
            case FORBIDDEN -> errorCode = ErrorCode.CALENDAR_FORBIDDEN_ERROR;
            case BAD_REQUEST -> errorCode = ErrorCode.CALENDAR_BAD_REQUEST_ERROR;
            case NOT_FOUND -> errorCode = ErrorCode.CALENDAR_NOT_FOUND_ERROR;
            default -> errorCode = ErrorCode.INTERNAL_ERROR;
        }
    }

    public CalendarException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
