package endolphin.backend.domain.user;

import endolphin.backend.domain.user.dto.GoogleUserInfo;
import endolphin.backend.domain.user.dto.GoogleTokens;
import endolphin.backend.domain.user.dto.OAuthResponse;
import endolphin.backend.domain.user.dto.UrlResponse;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.config.GoogleOAuthProperties;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.google.GoogleOAuthService;
import endolphin.backend.global.security.JwtProvider;
import endolphin.backend.global.security.UserContext;
import endolphin.backend.global.security.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserService {
    private final GoogleOAuthProperties googleOAuthProperties;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final GoogleOAuthService googleOAuthService;

    public UrlResponse getGoogleLoginUrl() {
        return new UrlResponse(String.format(
            "%s?client_id=%s&redirect_uri=%s&response_type=code&scope=%s&access_type=offline&prompt=consent",
            googleOAuthProperties.authUrl(), googleOAuthProperties.clientId(),
            googleOAuthProperties.redirectUri(), googleOAuthProperties.scope()));
    }

    public OAuthResponse oauth2Callback(String code) {
        GoogleTokens tokenResponse = googleOAuthService.getGoogleTokens(code);
        GoogleUserInfo userInfo = googleOAuthService.getUserInfo(tokenResponse.accessToken());
        User user = createUser(userInfo, tokenResponse);
        String accessToken = jwtProvider.createToken(user.getId(), user.getEmail());
        return new OAuthResponse(accessToken);
    }

    public User getCurrentUser() {
        UserInfo userInfo = UserContext.get();
        return userRepository.findById(userInfo.userId())
            .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));
    }

    private User createUser(GoogleUserInfo userInfo, GoogleTokens tokenResponse) {
        User user = userRepository.findByEmail(userInfo.email())
            .orElseGet(() -> {
                return User.builder()
                    .email(userInfo.email())
                    .name(userInfo.name())
                    .picture(userInfo.picture())
                    .accessToken(tokenResponse.accessToken())
                    .refreshToken(tokenResponse.refreshToken())
                    .build();
            });
        userRepository.save(user);
        return user;
    }


}
