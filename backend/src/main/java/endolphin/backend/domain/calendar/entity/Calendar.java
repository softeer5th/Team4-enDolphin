package endolphin.backend.domain.calendar.entity;

import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.base_entity.BaseTimeEntity;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "calendar")
public class Calendar extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "calendar_id", unique = true, nullable = false)
    private String calendarId;

    @Setter
    @Column(name = "sync_token")
    private String syncToken;

    @Column(name = "channel_id")
    private String channelId;

    @Column(name = "resource_id")
    private String resourceId;

    @Column(name = "channel_expiration")
    private LocalDateTime channelExpiration;

    @Builder
    public Calendar(User user, String name, String description, String calendarId) {
        this.user = user;
        this.name = name;
        this.description = description;
        this.calendarId = calendarId;
    }

    public void setWebhookProperties(String resourceId, String channelId,
        LocalDateTime channelExpiration) {
        this.resourceId = resourceId;
        this.channelId = channelId;
        this.channelExpiration = channelExpiration;
    }
}

