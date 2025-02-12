package endolphin.backend.domain.discussion.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

public record CandidateEventDetailsRequest(
    @NotNull LocalDateTime startDateTime,
    @NotNull LocalDateTime endDateTime,
    @NotNull List<Long> selectedUserIdList
) {

}
