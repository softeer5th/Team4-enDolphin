package endolphin.backend.domain.discussion.entity;

import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.base_entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "discussion_participant", indexes = {
    @Index(name = "idx_discussion_participant_discussion_id", columnList = "discussion_id"),
    @Index(name = "idx_discussion_participant_user_id", columnList = "user_id")
}, uniqueConstraints = {
    @UniqueConstraint(columnNames = {"discussion_id", "user_id"})
})
public class DiscussionParticipant extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // fk => discussion_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discussion_id", nullable = false)
    private Discussion discussion;

    // fk => user_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "is_host", nullable = false)
    private boolean isHost;

    @Column(name = "user_offset", nullable = false)
    private Long userOffset;

    @Builder
    public DiscussionParticipant(Discussion discussion, User user, boolean isHost,
        Long userOffset) {
        this.discussion = discussion;
        this.user = user;
        this.isHost = isHost;
        this.userOffset = userOffset;
    }
}

