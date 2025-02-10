package endolphin.backend.global.google;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import endolphin.backend.domain.auth.dto.UrlResponse;
import endolphin.backend.global.config.GoogleOAuthProperties;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class GoogleOAuthServiceTest {

    @Mock
    private GoogleOAuthProperties googleOAuthProperties;

    @InjectMocks
    private GoogleOAuthService googleOAuthService;

    private final String testAuthUrl = "https://accounts.google.com/o/oauth2/auth";
    private final String testClientId = "test-client-id";
    private final String testRedirectUri = "http://localhost:8080/test/callback";
    private final String testScope = "email profile";

    @Test
    @DisplayName("구글 로그인 url 반환 테스트")
    void getGoogleLoginUrl_ShouldReturnCorrectUrl() {
        given(googleOAuthProperties.clientId()).willReturn(testClientId);
        given(googleOAuthProperties.redirectUri()).willReturn(testRedirectUri);
        given(googleOAuthProperties.authUrl()).willReturn(testAuthUrl);
        given(googleOAuthProperties.scope()).willReturn(testScope);
        UrlResponse urlResponse = googleOAuthService.getGoogleLoginUrl();
        assertThat(urlResponse.url()).isEqualTo(
            testAuthUrl + "?client_id=" + testClientId + "&redirect_uri=" + testRedirectUri
                + "&response_type=code&scope=" + testScope + "&access_type=offline&prompt=consent"
        );
    }

}
