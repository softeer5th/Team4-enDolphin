package endolphin.backend.domain.discussion.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record JoinDiscussionRequest(
    @Size(min = 4, max = 6) @Pattern(regexp = "\\d+") String password
) {

}
