package endolphin.backend.global.error;

import endolphin.backend.global.error.exception.ErrorCode;

public record ErrorResponse(
    String message,
    String code
) {
    public static ErrorResponse of(ErrorCode errorCode) {
        return new ErrorResponse(errorCode.getMessage(), errorCode.getCode());
    }
}
