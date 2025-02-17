package endolphin.backend.domain.discussion.dto;

import java.time.LocalDate;
import java.util.List;

public record OngoingDiscussion(
    Long discussionId,
    String title,
    LocalDate dateRangeStart,
    LocalDate dateRangeEnd,
    Long timeLeft,
    List<String> participantPictureUrls
) {

}
