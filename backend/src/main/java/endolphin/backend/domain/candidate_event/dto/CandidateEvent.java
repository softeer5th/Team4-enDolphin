package endolphin.backend.domain.candidate_event.dto;

import java.time.LocalDateTime;
import java.util.List;

public record CandidateEvent(
    LocalDateTime startDateTime,
    LocalDateTime endDateTime,
    int userCount,
    int totalTimeToAdjust,
    List<Long> userOffsetList
) {

}
