package endolphin.backend.domain.shared_event;

import endolphin.backend.domain.shared_event.entity.SharedEvent;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SharedEventRepository extends JpaRepository<SharedEvent, Long> {

    public List<SharedEvent> findByDiscussionIdIn(List<Long> discussionIds);

    Optional<SharedEvent> findByDiscussionId(Long discussionId);

}
