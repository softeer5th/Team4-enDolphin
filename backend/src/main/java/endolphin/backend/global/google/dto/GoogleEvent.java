package endolphin.backend.global.google.dto;

import java.time.LocalDateTime;

public record GoogleEvent(
    String eventId,
    String summary,
    LocalDateTime startDateTime,
    LocalDateTime endDateTime,
    String state
) {

}
