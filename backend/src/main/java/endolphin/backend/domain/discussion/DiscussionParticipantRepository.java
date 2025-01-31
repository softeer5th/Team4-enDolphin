package endolphin.backend.domain.discussion;

import endolphin.backend.domain.discussion.entity.DiscussionParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscussionParticipantRepository extends JpaRepository<DiscussionParticipant, Long> {

}
