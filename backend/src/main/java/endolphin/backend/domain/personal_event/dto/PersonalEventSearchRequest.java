package endolphin.backend.domain.personal_event.dto;

import java.time.LocalDateTime;

public record PersonalEventSearchRequest(
    LocalDateTime startTime,
    LocalDateTime endTime
) {

}
