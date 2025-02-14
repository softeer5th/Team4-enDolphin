package endolphin.backend.global.google.dto;

import endolphin.backend.global.google.enums.GoogleEventStatus;
import java.time.LocalDateTime;

public record GoogleEvent(
    String eventId,
    String summary,
    LocalDateTime startDateTime,
    LocalDateTime endDateTime,
    GoogleEventStatus status
) {

}
