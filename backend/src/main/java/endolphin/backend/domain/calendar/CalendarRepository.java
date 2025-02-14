package endolphin.backend.domain.calendar;

import endolphin.backend.domain.calendar.entity.Calendar;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, Long> {

    Optional<Calendar> findByCalendarId(String calendarId);

    boolean existsByUserId(Long userId);

    Optional<Calendar> findByUserId(Long userId);
}
