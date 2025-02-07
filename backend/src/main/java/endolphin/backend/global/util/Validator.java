package endolphin.backend.global.util;

import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class Validator {

    public static void validateDateTimeRange(LocalDateTime start, LocalDateTime end) {
        if (end.isBefore(start)) {
            throw new ApiException(ErrorCode.INVALID_DATE_TIME_RANGE);
        }
    }

    public static void validateDateTimeRange(LocalDate start, LocalDate end) {
        if (end.isBefore(start)) {
            throw new ApiException(ErrorCode.INVALID_DATE_TIME_RANGE);
        }
    }

    public static void validateDateTimeRange(LocalTime start, LocalTime end) {
        if (end.isBefore(start)) {
            throw new ApiException(ErrorCode.INVALID_DATE_TIME_RANGE);
        }
    }
}
