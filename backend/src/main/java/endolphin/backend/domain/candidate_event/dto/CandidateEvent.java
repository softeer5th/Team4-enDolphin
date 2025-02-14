package endolphin.backend.domain.candidate_event.dto;

import java.time.LocalDateTime;
import java.util.List;

public record CandidateEvent(
    long startDateTime,
    long endDateTime,
    int userCount,
    int totalTimeToAdjust,
    int usersData
) {

}
