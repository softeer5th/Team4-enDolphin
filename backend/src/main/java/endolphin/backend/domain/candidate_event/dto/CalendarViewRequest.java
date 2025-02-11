package endolphin.backend.domain.candidate_event.dto;

import jakarta.validation.constraints.Max;
import java.time.LocalDate;
import java.util.List;

public record CalendarViewRequest(
    LocalDate startDate,
    LocalDate endDate,
    List<Long> selectedUserIdList,
    @Max(30) Integer size
) {

}
