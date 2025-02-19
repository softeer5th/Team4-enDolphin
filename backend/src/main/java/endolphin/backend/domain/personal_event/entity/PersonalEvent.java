package endolphin.backend.domain.personal_event.entity;

import endolphin.backend.domain.personal_event.dto.PersonalEventRequest;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.base_entity.BaseTimeEntity;
import endolphin.backend.global.google.dto.GoogleEvent;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;


@Getter
@NoArgsConstructor
@Entity
@Table(name = "personal_event")
public class PersonalEvent extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // fk => user_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "title", nullable = false)
    private String title; // summary

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @ColumnDefault("0")
    @Column(name = "is_adjustable")
    private Boolean isAdjustable;

    @Setter
    @Column(name = "calendar_id")
    private String calendarId;

    @Setter
    @Column(name = "google_event_id")
    private String googleEventId;

    @Builder
    public PersonalEvent(User user, String title,
        LocalDateTime startTime, LocalDateTime endTime,
        String calendarId, String googleEventId, boolean isAdjustable) {
        this.user = user;
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.calendarId = calendarId;
        this.googleEventId = googleEventId;
        this.isAdjustable = isAdjustable;
    }

    public void update(PersonalEventRequest personalEventRequest) {
        this.startTime = personalEventRequest.startDateTime();
        this.endTime = personalEventRequest.endDateTime();
        this.title = personalEventRequest.title();
        this.isAdjustable = personalEventRequest.isAdjustable();
    }

    public void update(LocalDateTime startDateTime, LocalDateTime endDateTime, String title) {
        this.startTime = startDateTime;
        this.endTime = endDateTime;
        this.title = title;
    }

    public PersonalEvent copy() {
        return PersonalEvent.builder()
            .title(this.title)
            .startTime(this.startTime)
            .endTime(this.endTime)
            .user(this.user)
            .build();
    }

    public static PersonalEvent fromGoogleEvent(GoogleEvent googleEvent, User user,
        String googleCalenderId) {
        return PersonalEvent.builder()
            .title(googleEvent.summary())
            .startTime(googleEvent.startDateTime())
            .endTime(googleEvent.endDateTime())
            .googleEventId(googleEvent.eventId())
            .isAdjustable(false)
            .calendarId(googleCalenderId)
            .user(user)
            .build();
    }
}
