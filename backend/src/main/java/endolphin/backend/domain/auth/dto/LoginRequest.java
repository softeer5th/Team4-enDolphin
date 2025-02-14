package endolphin.backend.domain.auth.dto;

import jakarta.validation.constraints.NotNull;

public record LoginRequest(
    @NotNull String code) {

}
