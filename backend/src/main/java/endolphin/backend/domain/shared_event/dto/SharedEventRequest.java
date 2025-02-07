package endolphin.backend.domain.shared_event.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record SharedEventRequest(
    @NotNull LocalDateTime startTime,
    @NotNull LocalDateTime endTime) {

}
