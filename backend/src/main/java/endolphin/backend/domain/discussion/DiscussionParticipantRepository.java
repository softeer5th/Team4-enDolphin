package endolphin.backend.domain.discussion;

import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.entity.DiscussionParticipant;
import endolphin.backend.domain.user.entity.User;
import java.util.List;
import java.util.Optional;
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

    @Query("select dp " +
        "from DiscussionParticipant dp " +
        "join fetch dp.user " +
        "where dp.discussion.id = :discussionId")
    List<User> findUsersByDiscussionId(@Param("discussionId") Long discussionId);

    @Query("SELECT dp.userOffset " +
        "FROM DiscussionParticipant dp " +
        "WHERE dp.discussion.id = :discussionId AND dp.user.id = :userId")
    Optional<Long> findOffsetByDiscussionIdAndUserId(@Param("discussionId") Long discussionId,
        @Param("userId") Long userId);

    @Query("SELECT COALESCE(MAX(dp.userOffset), -1) " +
        "FROM DiscussionParticipant dp " +
        "WHERE dp.discussion.id = :discussionId")
    Long findMaxOffsetByDiscussionId(@Param("discussionId") Long discussionId);

    @Query("SELECT dp.userOffset " +
        "FROM DiscussionParticipant dp " +
        "WHERE dp.discussion.id = :discussionId " +
        "AND dp.user.id IN :userIds")
    List<Long> findOffsetsByDiscussionIdAndUserIds(
        @Param("discussionId") Long discussionId,
        @Param("userIds") List<Long> userIds
    );

    @Query("SELECT dp.user.id " +
        "FROM DiscussionParticipant dp " +
        "WHERE dp.discussion.id = :discussionId " +
        "AND dp.userOffset IN :offset")
    List<Long> findUserIdsByDiscussionIdAndOffset(
        @Param("discussionId") Long discussionId,
        @Param("offset") List<Long> offsets
    );

    @Query("SELECT dp " +
        "FROM DiscussionParticipant dp " +
        "JOIN FETCH dp.discussion d " +
        "WHERE dp.user.id = :userId")
    List<Discussion> findDiscussionsByUserId(@Param("userId") Long userId);
}
