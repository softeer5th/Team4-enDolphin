package endolphin.backend.domain.candidate_event.dto;

import java.util.List;

public record RankViewResponse(
    List<CandidateEventResponse> eventsRankedDefault,
    List<CandidateEventResponse> eventsRankedOfTime
) {

}
