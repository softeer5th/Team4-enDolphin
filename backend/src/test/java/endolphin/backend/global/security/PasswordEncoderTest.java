package endolphin.backend.global.security;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

public class PasswordEncoderTest {

    private PasswordEncoder passwordEncoder;
    private final Long discussionId = 123L;
    private final String password = "secretPassword";

    @BeforeEach
    public void setUp() {
        passwordEncoder = new PasswordEncoder();
        String testSalt = "test123salt";
        ReflectionTestUtils.setField(passwordEncoder, "salt", testSalt);
    }

    @DisplayName("encode 테스트")
    @Test
    public void testEncodeReturnsNonNullAndNotPlainText() {
        String encodedPassword = passwordEncoder.encode(discussionId, password);
        assertThat(encodedPassword)
            .as("Encoded password should not be null and should not equal the plain text")
            .isNotNull()
            .isNotEqualTo(password);
    }

    @DisplayName("올바른 비밀번호 입력 테스트")
    @Test
    public void testMatchesReturnsTrueForCorrectPassword() {
        String encodedPassword = passwordEncoder.encode(discussionId, password);
        boolean match = passwordEncoder.matches(discussionId, password, encodedPassword);
        assertThat(match)
            .as("matches() should return true for correct password")
            .isTrue();
    }

    @DisplayName("잘못된 비밀번호 입력 테스트")
    @Test
    public void testMatchesReturnsFalseForIncorrectPassword() {
        String encodedPassword = passwordEncoder.encode(discussionId, password);
        boolean match = passwordEncoder.matches(discussionId, "wrongPassword", encodedPassword);
        assertThat(match)
            .as("matches() should return false for incorrect password")
            .isFalse();
    }
}
