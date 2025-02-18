package endolphin.backend.global.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {

    @Value("${jwt.expired}")
    private long validityInMs;
    private final SecretKey key;

    public JwtProvider(@Value("${jwt.secret}") String secretKey) {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    // 토큰 발행
    public String createToken(Long userId, String email) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + validityInMs);

        return Jwts.builder()
            .claim("userId", userId)
            .claim("email", email)
            .issuedAt(now)
            .expiration(expiry)
            .signWith(key)
            .compact();
    }

    // 검증, 파싱
    public Jws<Claims> validateToken(String token) {
        try {
            return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token);
        } catch (JwtException | IllegalArgumentException e) {
            throw new RuntimeException("Invalid or expired JWT token");
        }
    }
}
