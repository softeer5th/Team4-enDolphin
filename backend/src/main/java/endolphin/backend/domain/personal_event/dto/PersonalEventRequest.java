package endolphin.backend.domain.personal_event.dto;

import java.time.LocalDateTime;

public record PersonalEventRequest(
    String title,
    LocalDateTime startTime,
    LocalDateTime endTime,
    Boolean isAdjustable,
    Boolean syncWithGoogleCalendar
) {

}
