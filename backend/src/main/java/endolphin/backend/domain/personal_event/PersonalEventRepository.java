package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.user.entity.User;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalEventRepository extends JpaRepository<PersonalEvent, Long> {

    List<PersonalEvent> findByUserAndStartTimeBetween(User user, LocalDateTime start,
        LocalDateTime end);

    @Query("SELECT p FROM PersonalEvent p " +
        "WHERE p.user = :user " +
        "AND (" +
        "   CAST(p.startTime as localdate) <= :endDate " +
        "   AND CAST(p.endTime as localdate) >= :startDate" +
        ")")
    List<PersonalEvent> findFilteredPersonalEvents(
        @Param("user") User user,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate);

    Optional<PersonalEvent> findByGoogleEventIdAndCalendarId(String googleEventId, String calendarId);
}
