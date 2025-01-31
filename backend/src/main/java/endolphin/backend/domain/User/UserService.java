package endolphin.backend.domain.User;

import endolphin.backend.domain.User.dto.GoogleUserInfo;
import endolphin.backend.domain.User.dto.GoogleTokens;
import endolphin.backend.domain.User.dto.OAuthResponse;
import endolphin.backend.domain.User.dto.UrlResponse;
import endolphin.backend.domain.User.entity.User;
import endolphin.backend.global.config.GoogleOAuthProperties;
import endolphin.backend.global.security.JwtProvider;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserService {

    private final GoogleOAuthProperties googleOAuthProperties;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final RestTemplate restTemplate = new RestTemplate();

    public UrlResponse getGoogleLoginUrl() {
        return new UrlResponse(String.format(
            "%s?client_id=%s&redirect_uri=%s&response_type=code&scope=%s&access_type=offline",
            googleOAuthProperties.authUrl(), googleOAuthProperties.clientId(),
            googleOAuthProperties.redirectUri(), googleOAuthProperties.scope()));
    }

    public OAuthResponse oauth2Callback(String code) {
        GoogleTokens tokenResponse = getAccessToken(code);
        GoogleUserInfo userInfo = getUserInfo(tokenResponse.accessToken());
        User user = createUser(userInfo, tokenResponse);
        String accessToken = jwtProvider.createToken(user.getId(), user.getEmail());
        return new OAuthResponse(accessToken);
    }

    private User createUser(GoogleUserInfo userInfo, GoogleTokens tokenResponse) {
        User user = userRepository.findByEmail(userInfo.email())
            .orElseGet(() -> {
                return User.builder()
                    .email(userInfo.email())
                    .name(userInfo.name())
                    .picture(userInfo.pictureUrl())
                    .access_token(tokenResponse.accessToken())
                    .refresh_token(tokenResponse.refreshToken())
                    .build();
            });
        userRepository.save(user);
        return user;
    }

    private GoogleTokens getAccessToken(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", googleOAuthProperties.clientId());
        params.add("client_secret", googleOAuthProperties.clientSecret());
        params.add("redirect_uri", googleOAuthProperties.redirectUri());
        params.add("code", code);
        params.add("grant_type", "authorization_code");
        params.add("access_type", "offline");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(
            googleOAuthProperties.tokenUrl(), request,
            Map.class);

        String accessToken = (String) response.getBody().get("access_token");
        String refreshToken = (String) response.getBody().get("refresh_token");
        return new GoogleTokens(accessToken, refreshToken);
    }

    private GoogleUserInfo getUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> result = restTemplate.exchange(googleOAuthProperties.userInfoUrl(),
            HttpMethod.GET, entity, Map.class);

        Map<String, Object> map = result.getBody();
        String email = (String) map.get("email");
        String name = (String) map.get("name");
        String sub = (String) map.get("sub");
        String pic = (String) map.get("picture");
        return new GoogleUserInfo(sub, name, email, pic);
    }
}
