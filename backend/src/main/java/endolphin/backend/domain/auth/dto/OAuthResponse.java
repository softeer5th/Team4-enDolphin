package endolphin.backend.domain.auth.dto;

import java.time.LocalDateTime;

public record OAuthResponse(
    String accessToken,
    LocalDateTime expiredAt
) {

}
