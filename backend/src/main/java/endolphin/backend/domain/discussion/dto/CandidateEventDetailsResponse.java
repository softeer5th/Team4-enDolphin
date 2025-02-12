package endolphin.backend.domain.discussion.dto;

import endolphin.backend.domain.user.dto.UserInfoWithPersonalEvents;
import java.time.LocalDateTime;
import java.util.List;

public record CandidateEventDetailsResponse(
    Long discussionId,
    LocalDateTime startDateTime,
    LocalDateTime endDateTime,
    int numOfAdjustment,
    List<UserInfoWithPersonalEvents> participants
) {

}
