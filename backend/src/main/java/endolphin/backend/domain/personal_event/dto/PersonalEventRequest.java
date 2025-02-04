package endolphin.backend.domain.personal_event.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public record PersonalEventRequest(
    @NotBlank @Size(max=255) String title,
    @NotNull LocalDateTime startDateTime,
    @NotNull LocalDateTime endDateTime,
    Boolean isAdjustable,
    Boolean syncWithGoogleCalendar
) {

}
