package endolphin.backend.domain.discussion.dto;

import endolphin.backend.domain.discussion.enums.MeetingMethod;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record CreateDiscussionRequest(
    @NotNull String title,
    @NotNull LocalDate dateRangeStart,
    @NotNull LocalDate dateRangeEnd,
    @NotNull LocalTime timeRangeStart,
    @NotNull LocalTime timeRangeEnd,
    @NotNull Integer duration,
    MeetingMethod meetingMethod,
    String location,
    @NotNull LocalDate deadline) {

}
