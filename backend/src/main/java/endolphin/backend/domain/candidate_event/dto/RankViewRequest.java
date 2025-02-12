package endolphin.backend.domain.candidate_event.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.util.List;

public record RankViewRequest(
    @Valid List<@Min(0) @Max(14) Long> selectedUserIdList
) {

}
