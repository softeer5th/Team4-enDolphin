package endolphin.backend.global.google;

import endolphin.backend.domain.user.UserService;
import endolphin.backend.global.google.dto.GoogleTokens;
import endolphin.backend.global.google.dto.GoogleUserInfo;
import endolphin.backend.global.config.GoogleOAuthProperties;
import endolphin.backend.global.error.exception.OAuthException;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClient.RequestHeadersSpec.ConvertibleClientHttpResponse;

@Service
@RequiredArgsConstructor
@Slf4j
public class GoogleOAuthService {

    private final UserService userService;
    private final GoogleOAuthProperties googleOAuthProperties;
    private final RestClient restClient;

    public GoogleTokens getGoogleTokens(String code) {
        MultiValueMap<String, String> params = getStringStringMultiValueMap();
        params.add("code", code);
        params.add("grant_type", "authorization_code");
        params.add("access_type", "offline");

        return restClient.post()
            .uri(googleOAuthProperties.tokenUrl())
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .body(params)
            .exchange((request, response) -> {
                validateResponse(response);
                return response.bodyTo(GoogleTokens.class);
            });
    }

    public GoogleUserInfo getUserInfo(String accessToken) {
        return restClient.get()
            .uri(googleOAuthProperties.userInfoUrl())
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
            .exchange((request, response) -> {
                validateResponse(response);
                return response.bodyTo(GoogleUserInfo.class);
            });
    }

    public String reissueAccessToken(String refreshToken) {
        MultiValueMap<String, String> params = getStringStringMultiValueMap();
        params.add("grant_type", "refresh_token");
        params.add("refresh_token", refreshToken);

        String accessToken = restClient.post()
            .uri(googleOAuthProperties.tokenUrl())
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .body(params)
            .exchange((request, response) -> {
                validateResponse(response);
                GoogleTokens tokens = response.bodyTo(GoogleTokens.class);

                return tokens.accessToken();
            });
        userService.updateAccessToken(accessToken);
        return accessToken;
    }

    private MultiValueMap<String, String> getStringStringMultiValueMap() {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", googleOAuthProperties.clientId());
        params.add("client_secret", googleOAuthProperties.clientSecret());
        params.add("redirect_uri", googleOAuthProperties.redirectUri());
        return params;
    }

    private void validateResponse(ConvertibleClientHttpResponse response) throws IOException {
        if (response.getStatusCode().is4xxClientError()) {
            String error = response.bodyTo(String.class);
            throw new OAuthException((HttpStatus) response.getStatusCode(), error);
        }
    }
}
