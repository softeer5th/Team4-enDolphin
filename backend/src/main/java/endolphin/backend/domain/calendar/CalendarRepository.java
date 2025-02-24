package endolphin.backend.domain.calendar;

import endolphin.backend.domain.calendar.entity.Calendar;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, Long> {

    Optional<Calendar> findByCalendarId(String calendarId);

    boolean existsByUserId(Long userId);

    Optional<Calendar> findByUserId(Long userId);

    @Query("SELECT c.user.id, c.calendarId "
        + "FROM Calendar c "
        + "WHERE c.user.id IN :userIds")
    List<Object[]> findCalendarIdsByUserIds(@Param("userIds") List<Long> userIds);
}
