package endolphin.backend.domain.personal_event.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record PersonalEventSearchRequest(
    @NotNull LocalDateTime startTime,
    @NotNull LocalDateTime endTime
) {

}
