package endolphin.backend.domain.candidate_event.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.time.LocalDate;
import java.util.List;

public record CalendarViewRequest(
    LocalDate startDate,
    LocalDate endDate,
    @Valid List<@Min(0) @Max(14) Long> selectedUserIdList,
    @Max(30) Integer size
) {

}
