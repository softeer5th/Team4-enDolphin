package endolphin.backend.domain.discussion.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record OngoingDiscussion(
    Long discussionId,
    String title,
    LocalDate dateRangeStart,
    LocalDate dateRangeEnd,
    LocalTime timeRangeStart,
    LocalTime timeRangeEnd,
    Long timeLeft,
    List<String> participantPictureUrls
) {

}
