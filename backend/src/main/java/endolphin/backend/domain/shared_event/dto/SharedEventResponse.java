package endolphin.backend.domain.shared_event.dto;

import endolphin.backend.domain.shared_event.entity.SharedEvent;
import java.time.LocalDateTime;

public record SharedEventResponse(
    Long id,
    LocalDateTime startDateTime,
    LocalDateTime endDateTime
) {
    public static SharedEventResponse of(SharedEvent event) {
        return new SharedEventResponse(
            event.getId(),
            event.getStartDateTime(),
            event.getEndDateTime()
        );
    }

}
