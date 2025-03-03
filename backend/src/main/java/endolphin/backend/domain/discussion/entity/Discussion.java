package endolphin.backend.domain.discussion.entity;

import endolphin.backend.domain.discussion.enums.DiscussionStatus;
import endolphin.backend.domain.discussion.enums.MeetingMethod;
import endolphin.backend.global.base_entity.BaseTimeEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import java.util.Optional;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "discussion", indexes = {
    @Index(name = "idx_discussion_status", columnList = "discussion_status")
})
public class Discussion extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(name = "date_range_start", nullable = false)
    private LocalDate dateRangeStart;

    @Column(name = "date_range_end", nullable = false)
    private LocalDate dateRangeEnd;

    @Column(name = "time_range_start", nullable = false)
    private LocalTime timeRangeStart;

    @Column(name = "time_range_end", nullable = false)
    private LocalTime timeRangeEnd;

    @Column(nullable = false)
    private Integer duration;

    @Column(name = "meeting_method")
    @Enumerated(EnumType.STRING)
    private MeetingMethod meetingMethod;

    @Column
    private String location;

    @Column(nullable = false)
    private LocalDate deadline;

    @Setter
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'ONGOING'")
    @Column(name = "discussion_status", nullable = false)
    private DiscussionStatus discussionStatus;

    @Setter
    @Column(length = 255)
    @Size(min = 4, max = 100)
    private String password;

    @Setter
    @Column(name = "fixed_date")
    private LocalDate fixedDate;

    @Builder
    public Discussion(String title, LocalDate dateStart, LocalDate dateEnd,
        LocalTime timeStart, LocalTime timeEnd,
        Integer duration, LocalDate deadline,
        MeetingMethod meetingMethod, String location, DiscussionStatus status) {
        this.title = title;
        this.dateRangeStart = dateStart;
        this.dateRangeEnd = dateEnd;
        this.timeRangeStart = timeStart;
        this.timeRangeEnd = timeEnd;
        this.duration = duration;
        this.deadline = deadline;
        this.meetingMethod = meetingMethod;
        this.location = location;
        this.discussionStatus = status;
    }

    public String getMeetingMethodOrLocation() {
        return Optional.ofNullable(location)
            .orElseGet(() -> meetingMethod != null ? meetingMethod.name() : null);
    }
}
