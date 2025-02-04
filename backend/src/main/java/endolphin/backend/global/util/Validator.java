package endolphin.backend.global.util;

import java.time.LocalDateTime;

public class Validator {

    public static void validateDateTimeRange(LocalDateTime start, LocalDateTime end) {
        if (end.isBefore(start)) {
            throw new IllegalArgumentException("Date range cannot be before start date");
        }
    }
}
