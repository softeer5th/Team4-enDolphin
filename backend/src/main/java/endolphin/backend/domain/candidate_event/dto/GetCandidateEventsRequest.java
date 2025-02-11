package endolphin.backend.domain.candidate_event.dto;

import java.time.LocalDate;
import java.util.List;

public record GetCandidateEventsRequest(
    LocalDate startDate,
    LocalDate endDate,
    List<Long> selectedUserIdList,
    Integer size
) {

}
