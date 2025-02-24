package endolphin.backend.domain.personal_event.dto;

import endolphin.backend.global.google.dto.GoogleEvent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public record PersonalEventRequest(
    @NotBlank @Size(max = 200) String title,
    @NotNull LocalDateTime startDateTime,
    @NotNull LocalDateTime endDateTime,
    Boolean isAdjustable,
    Boolean syncWithGoogleCalendar
) {

    public static PersonalEventRequest of(GoogleEvent googleEvent) {
        return new PersonalEventRequest(
            googleEvent.summary(),
            googleEvent.startDateTime(),
            googleEvent.endDateTime(),
            false,
            false
        );
    }
}
