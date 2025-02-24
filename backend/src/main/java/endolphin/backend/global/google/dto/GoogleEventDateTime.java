package endolphin.backend.global.google.dto;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

public record GoogleEventDateTime(
    String dateTime,
    String timeZone
) {

    private final static DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;
    private final static ZoneId DEFAULT_ZONE_ID = ZoneId.of("Asia/Seoul");

    public static GoogleEventDateTime fromLocalDateTime(LocalDateTime dateTime) {

        return new GoogleEventDateTime(dateTime.atOffset(ZoneOffset.ofHours(9))
            .format(DATE_TIME_FORMATTER), DEFAULT_ZONE_ID.getId());
    }
}
