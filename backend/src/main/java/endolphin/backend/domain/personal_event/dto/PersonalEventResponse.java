package endolphin.backend.domain.personal_event.dto;

import java.time.LocalDateTime;

public record PersonalEventResponse(
    Long id,
    String title,
    LocalDateTime startTime,
    LocalDateTime endTime,
    Boolean isAdjustable
) {

}
