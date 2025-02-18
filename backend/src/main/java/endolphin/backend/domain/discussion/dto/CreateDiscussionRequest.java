package endolphin.backend.domain.discussion.dto;

import endolphin.backend.domain.discussion.enums.MeetingMethod;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;

public record CreateDiscussionRequest(
    @NotNull String title,
    @NotNull LocalDate dateRangeStart,
    @NotNull LocalDate dateRangeEnd,
    @NotNull LocalTime timeRangeStart,
    @NotNull LocalTime timeRangeEnd,
    @NotNull @Min(30) @Max(360) Integer duration,
    MeetingMethod meetingMethod,
    String location,
    @NotNull @Future LocalDate deadline,
    @Size(min = 4, max = 6) @Pattern(regexp = "\\d+") String password) {

}
