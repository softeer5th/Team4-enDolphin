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

    @Transactional(readOnly = true)
    public User getCurrentUser() {
        UserInfo userInfo = UserContext.get();
        return userRepository.findById(userInfo.userId())
            .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public User getUser(Long userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));
    }

    public void updateAccessToken(User user, String accessToken) {
        user.setAccessToken(accessToken);
        userRepository.save(user);
    }

    public User upsertUser(GoogleUserInfo userInfo, GoogleTokens tokenResponse) {
        User user = userRepository.findByEmail(userInfo.email())
            .orElseGet(() -> {
                return User.builder()
                    .email(userInfo.email())
                    .name(userInfo.name())
                    .picture(userInfo.picture())
                    .build();
            });
        user.setAccessToken(tokenResponse.accessToken());
        user.setRefreshToken(tokenResponse.refreshToken());
        userRepository.save(user);
        return user;
    }
}
