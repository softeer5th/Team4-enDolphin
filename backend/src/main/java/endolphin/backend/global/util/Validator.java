package endolphin.backend.global.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class Validator {

    public static void validateDateTimeRange(LocalDateTime start, LocalDateTime end) {
        if (end.isBefore(start)) {
            throw new IllegalArgumentException("Date range cannot be before start date");
        }
    }

    public static void validateDateTimeRange(LocalDate start, LocalDate end) {
        if (end.isBefore(start)) {
            throw new IllegalArgumentException("Date range cannot be before start date");
        }
    }

    public static void validateDateTimeRange(LocalTime start, LocalTime end) {
        if (end.isBefore(start)) {
            throw new IllegalArgumentException("Date range cannot be before start date");
        }
    }
}
