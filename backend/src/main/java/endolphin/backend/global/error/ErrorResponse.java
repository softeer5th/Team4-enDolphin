package endolphin.backend.global.error;

import endolphin.backend.global.error.exception.ErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.http.HttpStatus;

@Schema(description = "에러 응답")
public record ErrorResponse(
    @Schema(description = "에러 메시지", example = "Internal Server Error")
    String message,
    @Schema(description = "에러 코드", example = "C001")
    String code
) {

    public static ErrorResponse of(ErrorCode errorCode) {
        return new ErrorResponse(errorCode.getMessage(), errorCode.getCode());
    }
}
