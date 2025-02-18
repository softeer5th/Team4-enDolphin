package endolphin.backend.global.util;

import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class Validator {

    public static void validateDateTimeRange(LocalDateTime start, LocalDateTime end) {
        if (end.isBefore(start)) {
            throw new ApiException(ErrorCode.INVALID_DATE_TIME_REQUEST);
        }
    }

    public static void validateDateTimeRange(LocalDate start, LocalDate end) {
        if (end.isBefore(start)) {
            throw new ApiException(ErrorCode.INVALID_DATE_TIME_REQUEST);
        }
    }

    public static void validateDateTimeRange(LocalTime start, LocalTime end) {
        if (end.isBefore(start)) {
            throw new ApiException(ErrorCode.INVALID_DATE_TIME_REQUEST);
        }
    }

    public static void validateInRange(Discussion discussion, LocalDateTime eventStart, LocalDateTime eventEnd) {
        LocalDate startDate = discussion.getDateRangeStart();
        LocalDate endDate = discussion.getDateRangeEnd();
        LocalTime startTime = discussion.getTimeRangeStart();
        LocalTime endTime = discussion.getTimeRangeEnd();

        if (eventStart.toLocalDate().isBefore(startDate) || eventEnd.toLocalDate().isAfter(endDate)
            || eventStart.toLocalTime().isBefore(startTime) || eventEnd.toLocalTime().isAfter(endTime)) {
            throw new ApiException(ErrorCode.INVALID_DATE_TIME_REQUEST);
        }
    }

    public static void validateDuration(LocalDateTime start, LocalDateTime end, int duration) {
        if (!start.plusMinutes(duration).equals(end)) {
            throw new ApiException(ErrorCode.INVALID_DATE_TIME_REQUEST);
        }
    }
}
