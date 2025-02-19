package endolphin.backend.domain.discussion;

import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.entity.DiscussionParticipant;
import endolphin.backend.domain.discussion.enums.DiscussionStatus;
import endolphin.backend.domain.user.dto.UserIdNameDto;
import endolphin.backend.domain.user.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscussionParticipantRepository extends
    JpaRepository<DiscussionParticipant, Long> {

    @Query("SELECT dp.user " +
        "FROM DiscussionParticipant dp " +
        "WHERE dp.discussion.id = :discussionId " +
        "ORDER BY dp.userOffset ASC")
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

    @Query("SELECT dp.discussion " +
        "FROM DiscussionParticipant dp " +
        "WHERE dp.user.id = :userId")
    List<Discussion> findDiscussionsByUserId(@Param("userId") Long userId);

    @Query("SELECT new endolphin.backend.domain.user.dto.UserIdNameDto(u.id, u.name) " +
        "FROM DiscussionParticipant dp " +
        "JOIN dp.user u " +
        "WHERE dp.discussion.id = :discussionId " +
        "ORDER BY dp.userOffset ASC")
    List<UserIdNameDto> findUserIdNameDtosByDiscussionId(@Param("discussionId") Long discussionId);

    @Query("SELECT dp.userOffset, new endolphin.backend.domain.user.dto.UserIdNameDto(u.id, u.name) " +
        "FROM DiscussionParticipant dp " +
        "JOIN dp.user u " +
        "WHERE dp.discussion.id = :discussionId " +
        "ORDER BY dp.userOffset ASC")
    List<Object[]> findUserIdNameDtosWithOffset(@Param("discussionId") Long discussionId);

    @Query("SELECT dp.isHost " +
        "FROM DiscussionParticipant dp " +
        "WHERE dp.discussion.id = :discussionId " +
        "AND dp.user.id = :userId")
    Optional<Boolean> findIsHostByDiscussionIdAndUserId(@Param("discussionId") Long discussionId,
        @Param("userId") Long userId);

    @Query("SELECT u.name " +
        "FROM DiscussionParticipant dp " +
        "JOIN dp.user u " +
        "WHERE dp.discussion.id = :discussionId " +
        "AND dp.isHost = true")
    Optional<String> findHostNameByDiscussionIdAndIsHost(@Param("discussionId") Long discussionId);

    @Query("SELECT d " +
        "FROM DiscussionParticipant dp " +
        "JOIN dp.discussion d " +
        "WHERE dp.user.id = :userId " +
        "AND d.discussionStatus = 'ONGOING' " +
        "AND (:isHost IS NULL OR dp.isHost = :isHost) " +
        "ORDER BY d.deadline ASC")
    Page<Discussion> findOngoingDiscussions(@Param("userId") Long userId,
        @Param("isHost") Boolean isHost,
        Pageable pageable);

    @Query("SELECT dp.discussion.id, u.picture " +
        "FROM DiscussionParticipant dp " +
        "JOIN dp.user u " +
        "WHERE dp.discussion.id IN :discussionIds " +
        "ORDER BY dp.userOffset ASC")
    List<Object[]> findUserPicturesByDiscussionIds(
        @Param("discussionIds") List<Long> discussionIds);

    @Query("SELECT d " +
        "FROM DiscussionParticipant dp " +
        "JOIN dp.discussion d " +
        "WHERE dp.user.id = :userId " +
        "AND d.discussionStatus = 'FINISHED' " +
        "AND FUNCTION('YEAR', d.fixedDate) = :year " +
        "ORDER BY d.fixedDate ASC")
    Page<Discussion> findFinishedDiscussions(@Param("userId") Long userId,
        Pageable pageable,
        @Param("year") int year);

    @Query("SELECT d "
        + "FROM DiscussionParticipant dp "
        + "JOIN dp.discussion d "
        + "WHERE dp.user.id = :userId "
        + "AND d.discussionStatus = 'UPCOMING' ")
    List<Discussion> findUpcomingDiscussionsByUserId(@Param("userId") Long userId);
}
