package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalEventRepository extends JpaRepository<PersonalEvent, Long> {

}
