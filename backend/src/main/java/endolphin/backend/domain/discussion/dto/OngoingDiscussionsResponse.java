package endolphin.backend.domain.discussion.dto;

import java.util.List;

public record OngoingDiscussionsResponse(
    int currentPage,
    int totalPages,
    Boolean hasNext,
    Boolean hasPrevious,
    List<OngoingDiscussion> ongoingDiscussions
) {

}
