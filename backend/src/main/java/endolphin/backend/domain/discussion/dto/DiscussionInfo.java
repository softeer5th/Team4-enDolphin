package endolphin.backend.domain.discussion.dto;

import endolphin.backend.domain.discussion.enums.MeetingMethod;
import java.time.LocalDate;
import java.time.LocalTime;

public record DiscussionInfo(
    Long id,
    String title,
    LocalDate dateRangeStart,
    LocalDate dateRangeEnd,
    LocalTime timeRangeStart,
    LocalTime timeRangeEnd,
    MeetingMethod meetingMethod,
    String location,
    Integer duration,
    LocalDate deadline,
    Long timeLeft) {

}
