package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.user.entity.User;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalEventRepository extends JpaRepository<PersonalEvent, Long> {

    List<PersonalEvent> findByUserAndStartTimeBetween(User user, LocalDateTime start, LocalDateTime end);
}
