package endolphin.backend.domain.user.entity;

import endolphin.backend.global.base_entity.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "Users")
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String picture;
    private String access_token;
    private String refresh_token;

    @Builder
    public User(String name, String email, String picture, String access_token,
        String refresh_token) {
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }
}
