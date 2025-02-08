package endolphin.backend.domain.discussion;

import endolphin.backend.domain.discussion.entity.DiscussionParticipant;
import endolphin.backend.domain.user.dto.UserProfile;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscussionParticipantRepository extends
    JpaRepository<DiscussionParticipant, Long> {

    @Query("SELECT u.picture " +
        "FROM DiscussionParticipant dp " +
        "JOIN dp.user u " +
        "WHERE dp.discussion.id = :discussionId")
    List<String> findUserPicturesByDiscussionId(@Param("discussionId") Long discussionId);

    @Query("select new endolphin.backend.domain.user.dto.UserProfile(u.id, u.picture) " +
        "from DiscussionParticipant dp " +
        "join dp.user u " +
        "where dp.discussion.id = :discussionId")
    List<UserProfile> findUserProfilesByDiscussionId(@Param("discussionId") Long discussionId);
}
