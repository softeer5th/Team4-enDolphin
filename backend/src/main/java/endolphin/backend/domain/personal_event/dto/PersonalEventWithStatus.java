package endolphin.backend.domain.personal_event.dto;

import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.personal_event.enums.PersonalEventStatus;
import java.time.LocalDateTime;

public record PersonalEventWithStatus(
    Long id,
    LocalDateTime startDateTime,
    LocalDateTime endDateTime,
    String title,
    PersonalEventStatus status
) {

    public static PersonalEventWithStatus from(PersonalEvent personalEvent, LocalDateTime startTime,
        LocalDateTime endTime) {
        PersonalEventStatus status = PersonalEventStatus.FIXED;
        if (personalEvent.getIsAdjustable()) {
            status = PersonalEventStatus.ADJUSTABLE;
        }
        if (!personalEvent.getEndTime().isAfter(startTime) || !personalEvent.getStartTime()
            .isBefore(endTime)) {
            status = PersonalEventStatus.OUT_OF_RANGE;
        }
        return new PersonalEventWithStatus(personalEvent.getId(), personalEvent.getStartTime(),
            personalEvent.getEndTime(), personalEvent.getTitle(), status);
    }
}
