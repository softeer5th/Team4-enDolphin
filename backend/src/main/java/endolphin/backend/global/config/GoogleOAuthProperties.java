package endolphin.backend.global.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "google.oauth")
public record GoogleOAuthProperties(String clientId, String clientSecret,
                                    String redirectUri, String scope,
                                    String authUrl, String tokenUrl,
                                    String userInfoUrl) {

}
