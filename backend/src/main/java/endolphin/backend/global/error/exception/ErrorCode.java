package endolphin.backend.global.error.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    // Common
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "C001", "Internal Server Error"),
    INVALID_DATE_TIME_RANGE(HttpStatus.BAD_REQUEST, "C002", "End Time must be after Start Time"),

    // User
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "U001", "User not found"),

    // Discussion
    DISCUSSION_NOT_FOUND(HttpStatus.NOT_FOUND, "D001", "Discussion not found"),

    ;
    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
    ErrorCode(final HttpStatus httpStatus, final String code, final String message) {
        this.httpStatus = httpStatus;
        this.message = message;
        this.code = code;
    }
}
