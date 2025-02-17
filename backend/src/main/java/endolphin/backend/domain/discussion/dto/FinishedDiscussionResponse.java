package endolphin.backend.domain.discussion.dto;

import endolphin.backend.domain.shared_event.dto.SharedEventWithDiscussionInfoResponse;
import java.util.List;

public record FinishedDiscussionResponse(
    int currentYear,
    int currentPage,
    int totalPages,
    Boolean hasNext,
    Boolean hasPrevious,
    List<SharedEventWithDiscussionInfoResponse> finishedDiscussions
) {

}
