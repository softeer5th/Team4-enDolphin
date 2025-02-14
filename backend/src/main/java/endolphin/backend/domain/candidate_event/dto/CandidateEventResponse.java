package endolphin.backend.domain.candidate_event.dto;

import endolphin.backend.domain.user.dto.UserIdNameDto;
import java.time.LocalDateTime;
import java.util.List;

public record CandidateEventResponse(
    LocalDateTime startDateTime,
    LocalDateTime endDateTime,
    List<UserIdNameDto> usersForAdjust
) {

}
