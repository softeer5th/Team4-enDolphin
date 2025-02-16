package endolphin.backend.domain.discussion.dto;

import endolphin.backend.domain.user.dto.UserIdNameDto;
import java.util.List;

public record DiscussionParticipantsResponse(
    List<UserIdNameDto> participants
) {

}
