package endolphin.backend.global.google.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

public record EventTime(
    String dateTime,
    String timeZone,
    String date
) {

}
