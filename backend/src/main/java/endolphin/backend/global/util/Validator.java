package endolphin.backend.global.util;

import java.time.LocalDateTime;

public class Validator {

    public static void validateDateRange(LocalDateTime start, LocalDateTime end) {
        if (end.isBefore(start)) {
            throw new RuntimeException("Date range cannot be before start date");
        }
    }
}
