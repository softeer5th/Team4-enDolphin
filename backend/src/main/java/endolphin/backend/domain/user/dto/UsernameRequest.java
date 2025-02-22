package endolphin.backend.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UsernameRequest(
    @NotBlank @Size(max = 120) String name
) {

}
