package endolphin.backend.domain.shared_event.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record SharedEventRequest(
    @NotNull @Future LocalDateTime startDateTime,
    @NotNull @Future LocalDateTime endDateTime) {

}
