package endolphin.backend.global.google;

import endolphin.backend.domain.user.dto.GoogleTokens;
import endolphin.backend.domain.user.dto.GoogleUserInfo;
import endolphin.backend.global.config.GoogleOAuthProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class GoogleOAuthService {
    private final GoogleOAuthProperties googleOAuthProperties;
    private final RestTemplate restTemplate;

    public GoogleTokens getAccessToken(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = getHttpEntity(
            code, headers);
        ResponseEntity<GoogleTokens> response = restTemplate.postForEntity(
            googleOAuthProperties.tokenUrl(), request,
            GoogleTokens.class);

        return response.getBody();
    }

    public GoogleUserInfo getUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<GoogleUserInfo> result = restTemplate.exchange(googleOAuthProperties.userInfoUrl(),
            HttpMethod.GET, entity, GoogleUserInfo.class);

        return result.getBody();
    }

    private HttpEntity<MultiValueMap<String, String>> getHttpEntity(String code,
        HttpHeaders headers) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", googleOAuthProperties.clientId());
        params.add("client_secret", googleOAuthProperties.clientSecret());
        params.add("redirect_uri", googleOAuthProperties.redirectUri());
        params.add("code", code);
        params.add("grant_type", "authorization_code");
        params.add("access_type", "offline");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        return request;
    }


}
