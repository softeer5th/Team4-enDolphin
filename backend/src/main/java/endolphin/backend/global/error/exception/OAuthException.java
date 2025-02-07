package endolphin.backend.global.error.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class OAuthException extends RuntimeException {

    private final HttpStatus status;
    private final ErrorCode errorCode;

    public OAuthException(HttpStatus status, String message) {
        super(message);
        this.status = status;
        switch (status) {
            case UNAUTHORIZED -> errorCode = ErrorCode.OAUTH_UNAUTHORIZED_ERROR;
            case FORBIDDEN -> errorCode = ErrorCode.OAUTH_FORBIDDEN_ERROR;
            case BAD_REQUEST -> errorCode = ErrorCode.OAUTH_BAD_REQUEST_ERROR;
            default -> errorCode = ErrorCode.INTERNAL_ERROR;
        }
    }
}
