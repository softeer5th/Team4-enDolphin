package endolphin.backend.domain.candidate_event.dto;


public record CandidateEvent(
    long startDateTime,
    long endDateTime,
    int userCount,
    int totalTimeToAdjust,
    int usersData
) {

}
