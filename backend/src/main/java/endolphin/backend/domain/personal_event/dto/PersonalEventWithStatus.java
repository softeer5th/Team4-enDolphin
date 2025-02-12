package endolphin.backend.domain.personal_event.dto;

import java.time.LocalDateTime;

public record PersonalEventWithStatus(
    Long id,
    LocalDateTime startDateTime,
    LocalDateTime endDateTime,
    String title,
    String status
) {

}
