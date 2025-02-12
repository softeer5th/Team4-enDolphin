package endolphin.backend.domain.candidate_event.dto;

import java.util.List;

public record RankViewRequest(
    List<Long> selectedUserIdList
) {

}
