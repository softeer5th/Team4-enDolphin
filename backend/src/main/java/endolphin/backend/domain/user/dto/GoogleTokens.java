package endolphin.backend.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GoogleTokens(
    @JsonProperty("access_token")
    String accessToken,
    @JsonProperty("refresh_token")
    String refreshToken) {

}
