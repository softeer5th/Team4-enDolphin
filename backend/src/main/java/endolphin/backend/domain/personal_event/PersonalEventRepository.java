package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.user.entity.User;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalEventRepository extends JpaRepository<PersonalEvent, Long> {

    List<PersonalEvent> findByUserAndStartTimeBetween(User user, LocalDateTime start, LocalDateTime end);

    @Query("SELECT p FROM PersonalEvent p " +
        "WHERE p.user = :user " +
        "   AND (CAST(p.startTime AS localdate) BETWEEN :startDate AND :endDate " +
        "   OR CAST(p.endTime AS localdate) BETWEEN :startDate AND :endDate) " +
        "   AND (CAST(p.startTime AS localtime ) BETWEEN :startTime AND :endTime " +
        "   OR CAST(p.endTime AS localtime) BETWEEN :startTime AND :endTime)")
    List<PersonalEvent> findFilteredPersonalEvents(
        @Param("user") User user,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate,
        @Param("startTime") LocalTime startTime,
        @Param("endTime") LocalTime endTime);
}
