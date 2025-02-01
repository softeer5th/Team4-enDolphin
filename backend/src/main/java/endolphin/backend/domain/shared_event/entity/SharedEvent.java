package endolphin.backend.domain.shared_event.entity;

import endolphin.backend.domain.discussion.entity.Discussion;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "shared_event")
public class SharedEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // fk => discussion_id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discussion_id", nullable = false)
    private Discussion discussion;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Builder
    public SharedEvent(Discussion discussion, LocalDateTime start, LocalDateTime end) {
        this.discussion = discussion;
        this.startTime = start;
        this.endTime = end;
    }
}
