package endolphin.backend.domain.discussion.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record InvitationInfo(
    String host,
    String title,
    LocalDate dateRangeStart,
    LocalDate dateRangeEnd,
    LocalTime timeRangeStart,
    LocalTime timeRangeEnd,
    Integer duration,
    Boolean isFull,
    Boolean requirePassword
) {

}
