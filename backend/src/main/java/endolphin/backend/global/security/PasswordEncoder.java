package endolphin.backend.global.security;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class PasswordEncoder {

    @Value("${endolphin.security.salt}")
    private String salt;

    public String encode(Long discussionId, String password) {
        try {
            KeySpec spec = new PBEKeySpec(password.toCharArray(), getSalt(discussionId), 10000,
                128);
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
            byte[] hash = factory.generateSecret(spec).getEncoded();
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException("Error during password encryption", e);
        }
    }

    private byte[] getSalt(Long discussionId) throws NoSuchAlgorithmException {
        String discussionSalt = discussionId.toString() + salt;
        MessageDigest digest = MessageDigest.getInstance("SHA-512");
        byte[] keyBytes = discussionSalt.getBytes(StandardCharsets.UTF_8);
        return digest.digest(keyBytes);
    }

    public boolean matches(Long discussionId, String password, String encodedPassword) {
        return encode(discussionId, password).equals(encodedPassword);
    }
}
