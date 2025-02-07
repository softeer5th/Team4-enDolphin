package endolphin.backend.domain.discussion.dto;

import endolphin.backend.domain.discussion.enums.MeetingMethod;
import java.time.LocalDate;

public record DiscussionResponse(
    Long id,
    String title,
    LocalDate dateRangeStart,
    LocalDate dateRangeEnd,
    MeetingMethod meetingMethod,
    String location,
    Integer duration,
    long timeLeft) {

}
