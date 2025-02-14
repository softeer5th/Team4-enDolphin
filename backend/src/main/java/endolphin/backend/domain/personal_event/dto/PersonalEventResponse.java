package endolphin.backend.domain.personal_event.dto;

import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import java.time.LocalDateTime;

public record PersonalEventResponse(
    Long id,
    String title,
    LocalDateTime startDateTime,
    LocalDateTime endDateTime,
    Boolean isAdjustable,
    String calendarId
) {
    public static PersonalEventResponse fromEntity(PersonalEvent event) {
        return new PersonalEventResponse(
            event.getId(),
            event.getTitle(),
            event.getStartTime(),
            event.getEndTime(),
            event.getIsAdjustable(),
            event.getCalendarId()
        );
    }
}
