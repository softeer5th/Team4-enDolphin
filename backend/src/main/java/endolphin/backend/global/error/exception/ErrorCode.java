package endolphin.backend.global.error.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    // Common

    // User
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "U001", "User not found"),

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
