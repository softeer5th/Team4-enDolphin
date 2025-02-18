package endolphin.backend.global.google.dto;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

public record GoogleEventDateTime(
    String dateTime,
    String timeZone
) {
    private final static DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;
    public static GoogleEventDateTime fromLocalDateTime(LocalDateTime dateTime) {

        return new GoogleEventDateTime(dateTime.atOffset(ZoneOffset.ofHours(9)).format(DATE_TIME_FORMATTER), "Asia/Seoul");
    }
}
