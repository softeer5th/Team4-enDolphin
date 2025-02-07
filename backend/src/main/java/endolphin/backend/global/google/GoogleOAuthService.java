package endolphin.backend.global.google;

import endolphin.backend.domain.user.dto.GoogleTokens;
import endolphin.backend.domain.user.dto.GoogleUserInfo;
import endolphin.backend.global.config.GoogleOAuthProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

@Service
@RequiredArgsConstructor
public class GoogleOAuthService {

    private final GoogleOAuthProperties googleOAuthProperties;
    private final RestClient restClient;

    public GoogleTokens getGoogleTokens(String code) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", googleOAuthProperties.clientId());
        params.add("client_secret", googleOAuthProperties.clientSecret());
        params.add("redirect_uri", googleOAuthProperties.redirectUri());
        params.add("code", code);
        params.add("grant_type", "authorization_code");
        params.add("access_type", "offline");

        return restClient.post()
            .uri(googleOAuthProperties.tokenUrl())
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .body(params)
            .retrieve()
            .body(GoogleTokens.class);
    }

    public GoogleUserInfo getUserInfo(String accessToken) {
        return restClient.get()
            .uri(googleOAuthProperties.userInfoUrl())
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
            .retrieve()
            .body(GoogleUserInfo.class);
    }

    public String reissueAccessToken(String refreshToken) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", googleOAuthProperties.clientId());
        params.add("client_secret", googleOAuthProperties.clientSecret());
        params.add("redirect_uri", googleOAuthProperties.redirectUri());
        params.add("grant_type", "refresh_token");
        params.add("refresh_token", refreshToken);

        return restClient.post()
            .uri(googleOAuthProperties.tokenUrl())
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .body(params)
            .retrieve()
            .body(GoogleTokens.class)
            .accessToken();
    }
}
