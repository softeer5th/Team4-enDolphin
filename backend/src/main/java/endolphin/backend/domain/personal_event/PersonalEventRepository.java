package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.user.entity.User;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalEventRepository extends JpaRepository<PersonalEvent, Long> {

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

    Optional<PersonalEvent> findByGoogleEventIdAndCalendarId(String googleEventId,
        String calendarId);

    @Query("SELECT p "
        + "FROM PersonalEvent p "
        + "JOIN FETCH p.user u "
        + "WHERE u.id IN :userIds "
        + "AND p.startTime <= :endDateTime "
        + "AND p.endTime >= :startDateTime")
    List<PersonalEvent> findAllByUsersAndDateTimeRange(
        @Param("userIds") List<Long> userIds,
        @Param("startDateTime") LocalDateTime start,
        @Param("endDateTime") LocalDateTime end);

    @Query("SELECT COUNT(p) "
        + "FROM PersonalEvent p "
        + "WHERE p.user.id = :userId "
        + "AND p.startTime <= :endDateTime "
        + "AND p.endTime >= :startDateTime")
    Long countByUserIdAndDateTimeRange(
        @Param("userId") Long userId,
        @Param("startDateTime") LocalDateTime start,
        @Param("endDateTime") LocalDateTime end);
}
