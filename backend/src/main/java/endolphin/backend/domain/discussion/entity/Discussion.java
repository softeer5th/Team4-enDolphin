package endolphin.backend.domain.discussion.entity;

import endolphin.backend.domain.discussion.enums.MeetingMethod;
import endolphin.backend.global.base_entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import org.hibernate.annotations.ColumnDefault;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "discussion")
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

    @ColumnDefault("1")
    @Column(name = "is_modifiable", nullable = false)
    private Boolean isModifiable;

    @Builder
    public Discussion(String title, LocalDate dateStart, LocalDate dateEnd,
        LocalTime timeStart, LocalTime timeEnd,
        Integer duration, LocalDate deadline) {
        this.title = title;
        this.dateRangeStart = dateStart;
        this.dateRangeEnd = dateEnd;
        this.timeRangeStart = timeStart;
        this.timeRangeEnd = timeEnd;
        this.duration = duration;
        this.deadline = deadline;
    }
}
