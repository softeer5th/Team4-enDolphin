package endolphin.backend.domain.shared_event.dto;

import endolphin.backend.domain.shared_event.entity.SharedEvent;
import java.time.LocalDateTime;

public record SharedEventDto(
    Long id,
    LocalDateTime startDateTime,
    LocalDateTime endDateTime
) {
    public static SharedEventDto of(SharedEvent event) {
        return new SharedEventDto(
            event.getId(),
            event.getStartDateTime(),
            event.getEndDateTime()
        );
    }

}
