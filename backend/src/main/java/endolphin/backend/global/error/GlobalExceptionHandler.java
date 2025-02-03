package endolphin.backend.global.error;

import endolphin.backend.global.error.exception.ApiException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponse> handleApiException(ApiException e) {
        log.error("API exception: ", e);
        ErrorResponse response = ErrorResponse.of(e.getErrorCode());
        return ResponseEntity.status((e.getErrorCode().getHttpStatus())).body(response);
    }
}
