package endolphin.backend.domain.discussion.dto;

import java.time.LocalDate;
import java.util.List;

public record OngoingDiscussionResponse(
    Long discussionId,
    String title,
    LocalDate dateRangeStart,
    LocalDate dateRangeEnd,
    Long timeLeft,
    List<String> participantPictureUrls
) {

}
