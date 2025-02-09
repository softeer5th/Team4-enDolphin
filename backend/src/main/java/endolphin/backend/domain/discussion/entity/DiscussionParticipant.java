package endolphin.backend.domain.discussion.entity;

import endolphin.backend.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "discussion_participant")
public class DiscussionParticipant {

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

    @Column(name = "index", nullable = false)
    private Long index;

    @Builder
    public DiscussionParticipant(Discussion discussion, User user, boolean isHost, Long index) {
        this.discussion = discussion;
        this.user = user;
        this.isHost = isHost;
        this.index = index;
    }
}

