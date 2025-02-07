package endolphin.backend.domain.user;

import endolphin.backend.global.google.dto.GoogleUserInfo;
import endolphin.backend.global.google.dto.GoogleTokens;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
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
    private final UserRepository userRepository;

    public User getCurrentUser() {
        UserInfo userInfo = UserContext.get();
        return userRepository.findById(userInfo.userId())
            .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));
    }

    public void updateAccessToken(String accessToken) {
        User user = getCurrentUser();
        user.setAccessToken(accessToken);
    }

    public User createUser(GoogleUserInfo userInfo, GoogleTokens tokenResponse) {
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
