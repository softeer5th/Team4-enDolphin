package endolphin.backend.domain.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.entity.DiscussionParticipant;
import endolphin.backend.domain.discussion.enums.DiscussionStatus;
import endolphin.backend.domain.user.dto.UserIdNameDto;
import endolphin.backend.domain.user.entity.User;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.util.ReflectionTestUtils;

@DataJpaTest
public class DiscussionParticipantRepositoryTest {

    @Autowired
    private DiscussionParticipantRepository discussionParticipantRepository;

    @Autowired
    private EntityManager entityManager;

    private Discussion discussion;
    private User user1;
    private User user2;
    private User user3;

    @BeforeEach
    public void setup() {
        // Create a Discussion
        discussion = Discussion.builder()
            .title("Test Discussion")
            .dateStart(LocalDate.now())
            .dateEnd(LocalDate.now().plusDays(1))
            .timeStart(LocalTime.of(9, 0))
            .timeEnd(LocalTime.of(17, 0))
            .duration(60)
            .deadline(LocalDate.now().plusDays(2))
            .location("Test Location")
            .build();
        ReflectionTestUtils.setField(discussion, "discussionStatus", DiscussionStatus.ONGOING);
        entityManager.persist(discussion);

        // Create Users
        user1 = User.builder()
            .name("Alice")
            .email("alice@example.com")
            .picture("alice.jpg")
            .build();
        entityManager.persist(user1);

        user2 = User.builder()
            .name("Bob")
            .email("bob@example.com")
            .picture("bob.jpg")
            .build();
        entityManager.persist(user2);

        user3 = User.builder()
            .name("Charlie")
            .email("charlie@example.com")
            .picture("charlie.jpg")
            .build();
        entityManager.persist(user3);

        // Create DiscussionParticipants with userOffset values
        DiscussionParticipant dp1 = DiscussionParticipant.builder()
            .discussion(discussion)
            .user(user1)
            .isHost(true)
            .userOffset(0L)
            .build();
        entityManager.persist(dp1);

        DiscussionParticipant dp2 = DiscussionParticipant.builder()
            .discussion(discussion)
            .user(user2)
            .isHost(false)
            .userOffset(1L)
            .build();
        entityManager.persist(dp2);

        DiscussionParticipant dp3 = DiscussionParticipant.builder()
            .discussion(discussion)
            .user(user3)
            .isHost(false)
            .userOffset(2L)
            .build();
        entityManager.persist(dp3);

        entityManager.flush();
        entityManager.clear();
    }

    @DisplayName("discussionId로 참여자 목록 조회")
    @Test
    public void testFindUsersByDiscussionId() {
        List<User> users = discussionParticipantRepository.findUsersByDiscussionId(discussion.getId());
        assertThat(users).hasSize(3);
        // 사용자 offset 순서대로 반환되어야 함: user1, user2, user3
        assertThat(users.get(0).getId()).isEqualTo(user1.getId());
        assertThat(users.get(1).getId()).isEqualTo(user2.getId());
        assertThat(users.get(2).getId()).isEqualTo(user3.getId());
    }

    @DisplayName("discussionId, userId로 userOffset 조회")
    @Test
    public void testFindOffsetByDiscussionIdAndUserId() {
        Optional<Long> offsetOpt = discussionParticipantRepository.findOffsetByDiscussionIdAndUserId(discussion.getId(), user2.getId());
        assertThat(offsetOpt).isPresent();
        assertThat(offsetOpt.get()).isEqualTo(1L);
    }

    @DisplayName("유저 offset 최대값 조회")
    @Test
    public void testFindMaxOffsetByDiscussionId() {
        Long maxOffset = discussionParticipantRepository.findMaxOffsetByDiscussionId(discussion.getId());
        assertThat(maxOffset).isEqualTo(2L);
    }

    @DisplayName("discussionId, userIds로 userOffset 조회")
    @Test
    public void testFindOffsetsByDiscussionIdAndUserIds() {
        List<Long> userIds = Arrays.asList(user1.getId(), user3.getId());
        List<Long> offsets = discussionParticipantRepository.findOffsetsByDiscussionIdAndUserIds(discussion.getId(), userIds);
        assertThat(offsets).containsExactlyInAnyOrder(0L, 2L);
    }

    @DisplayName("discussionId, offsets로 user ID 조회")
    @Test
    public void testFindUserIdsByDiscussionIdAndOffset() {
        List<Object[]> users = discussionParticipantRepository.findUserIdNameDtosWithOffset(discussion.getId());
        // 예상: user2와 user3의 ID
        assertThat(users).containsExactlyInAnyOrder(
            new Object[]{0L, new UserIdNameDto(user1.getId(), user1.getName())},
            new Object[]{1L, new UserIdNameDto(user2.getId(), user2.getName())},
            new Object[]{2L, new UserIdNameDto(user3.getId(), user3.getName())}
        );
    }

    @DisplayName("userId로 참여한 논의 목록 조회")
    @Test
    public void testFindDiscussionsByUserId() {
        List<Discussion> discussions = discussionParticipantRepository.findDiscussionsByUserId(user1.getId());
        assertThat(discussions).hasSize(1);
        assertThat(discussions.get(0).getId()).isEqualTo(discussion.getId());
    }

    @DisplayName("discussionId로 참여자 ID, 이름 목록 조회")
    @Test
    public void testFindUserIdNameDtosByDiscussionId() {
        List<UserIdNameDto> dtos = discussionParticipantRepository.findUserIdNameDtosByDiscussionId(discussion.getId());
        assertThat(dtos).hasSize(3);
        // 순서: user1 (offset 0), user2 (offset 1), user3 (offset 2)
        assertThat(dtos.get(0).id()).isEqualTo(user1.getId());
        assertThat(dtos.get(0).name()).isEqualTo(user1.getName());
        assertThat(dtos.get(1).id()).isEqualTo(user2.getId());
        assertThat(dtos.get(1).name()).isEqualTo(user2.getName());
        assertThat(dtos.get(2).id()).isEqualTo(user3.getId());
        assertThat(dtos.get(2).name()).isEqualTo(user3.getName());
    }

    @DisplayName("discussionId, userId로 호스트 여부 조회(true)")
    @Test
    public void testFindIsHostByDiscussionIdAndUserId_returnsTrue() {
        Optional<Boolean> result = discussionParticipantRepository.findIsHostByDiscussionIdAndUserId(
            discussion.getId(), user1.getId());
        assertThat(result).isPresent();
        assertThat(result.get()).isTrue();
    }

    @DisplayName("discussionId, userId로 호스트 여부 조회(false)")
    @Test
    public void testFindIsHostByDiscussionIdAndUserId_returnsFalse() {
        Optional<Boolean> result = discussionParticipantRepository.findIsHostByDiscussionIdAndUserId(
            discussion.getId(), user2.getId());
        assertThat(result).isPresent();
        assertThat(result.get()).isFalse();
    }

    @DisplayName("findOngoingDiscussions 쿼리 테스트 - Host False")
    @Test
    public void testFindOngoingDiscussions_HostFalse() {
        Page<Discussion> results = discussionParticipantRepository.findOngoingDiscussions(
            user2.getId(), false, PageRequest.of(0, 10));
        assertThat(results.getContent()).hasSize(1);
        assertThat(results.getContent().get(0).getId()).isEqualTo(discussion.getId());
    }

    @DisplayName("findOngoingDiscussions 쿼리 테스트 - Host Null")
    @Test
    public void testFindOngoingDiscussions_HostNull() {
        Page<Discussion> results = discussionParticipantRepository.findOngoingDiscussions(
            user3.getId(), null, PageRequest.of(0, 10));
        assertThat(results.getContent()).hasSize(1);
        assertThat(results.getContent().get(0).getId()).isEqualTo(discussion.getId());
    }

    @DisplayName("findOngoingDiscussions 쿼리 테스트 - 정렬 검증")
    @Test
    public void testFindOngoingDiscussions_Order() {
        Discussion discussion2 = Discussion.builder()
            .title("Early Discussion")
            .dateStart(LocalDate.now().minusDays(2))
            .dateEnd(LocalDate.now().minusDays(1))
            .timeStart(LocalTime.of(8, 0))
            .timeEnd(LocalTime.of(16, 0))
            .duration(60)
            .deadline(LocalDate.now().minusDays(1))
            .location("Early Location")
            .build();
        ReflectionTestUtils.setField(discussion2, "discussionStatus", DiscussionStatus.ONGOING);
        entityManager.persist(discussion2);

        DiscussionParticipant dpForDiscussion2 = DiscussionParticipant.builder()
            .discussion(discussion2)
            .user(user1)
            .isHost(true)
            .userOffset(0L)
            .build();
        entityManager.persist(dpForDiscussion2);

        entityManager.flush();
        entityManager.clear();

        Page<Discussion> results = discussionParticipantRepository.findOngoingDiscussions(
            user1.getId(), true, PageRequest.of(0, 10));
        List<Discussion> discussionsResult = results.getContent();

        assertThat(discussionsResult).hasSize(2);
        assertThat(discussionsResult.get(0).getDeadline())
            .isBeforeOrEqualTo(discussionsResult.get(1).getDeadline());
    }

    @DisplayName("discussionId로 참여자 사진 목록 조회 및 정렬 검증")
    @Test
    public void testFindUserPicturesByDiscussionIds() {
        Discussion discussion = Discussion.builder()
            .title("Test Discussion")
            .dateStart(LocalDate.now())
            .dateEnd(LocalDate.now().plusDays(1))
            .timeStart(LocalTime.of(9, 0))
            .timeEnd(LocalTime.of(17, 0))
            .duration(60)
            .deadline(LocalDate.now().plusDays(2))
            .location("Test Location")
            .build();
        ReflectionTestUtils.setField(discussion, "discussionStatus", DiscussionStatus.ONGOING);
        entityManager.persist(discussion);
        entityManager.flush();
        Long discussionId = discussion.getId();

        // Users 생성
        User user1 = User.builder()
            .name("Alice")
            .email("alice@example.com")
            .picture("pic1.jpg")
            .build();
        entityManager.persist(user1);

        User user2 = User.builder()
            .name("Bob")
            .email("bob@example.com")
            .picture("pic2.jpg")
            .build();
        entityManager.persist(user2);

        User user3 = User.builder()
            .name("Charlie")
            .email("charlie@example.com")
            .picture("pic3.jpg")
            .build();
        entityManager.persist(user3);

        DiscussionParticipant dp1 = DiscussionParticipant.builder()
            .discussion(discussion)
            .user(user1)
            .isHost(true)
            .userOffset(2L)
            .build();
        entityManager.persist(dp1);

        DiscussionParticipant dp2 = DiscussionParticipant.builder()
            .discussion(discussion)
            .user(user2)
            .isHost(false)
            .userOffset(0L)
            .build();
        entityManager.persist(dp2);

        DiscussionParticipant dp3 = DiscussionParticipant.builder()
            .discussion(discussion)
            .user(user3)
            .isHost(false)
            .userOffset(1L)
            .build();
        entityManager.persist(dp3);

        entityManager.flush();
        entityManager.clear();

        List<Object[]> results = discussionParticipantRepository.findUserPicturesByDiscussionIds(Arrays.asList(discussionId));

        assertThat(results).hasSize(3);

        Object[] row1 = results.get(0);
        Object[] row2 = results.get(1);
        Object[] row3 = results.get(2);

        assertThat((Long) row1[0]).isEqualTo(discussionId);
        assertThat((String) row1[1]).isEqualTo("pic2.jpg");

        assertThat((Long) row2[0]).isEqualTo(discussionId);
        assertThat((String) row2[1]).isEqualTo("pic3.jpg");

        assertThat((Long) row3[0]).isEqualTo(discussionId);
        assertThat((String) row3[1]).isEqualTo("pic1.jpg");
    }

    @DisplayName("findFinishedDiscussions: userId, year 필터 및 fixedDate 정렬 검증")
    @Test
    public void testFindFinishedDiscussions() {
        // 사용자 생성
        User user = User.builder()
            .name("Test User")
            .email("test@example.com")
            .picture("userpic.jpg")
            .build();
        entityManager.persist(user);

        // Discussion 1: FINISHED, dateRangeEnd 연도 2025, fixedDate = 2025-01-01
        Discussion discussion1 = Discussion.builder()
            .title("Discussion 1")
            .dateStart(LocalDate.of(2025, 1, 10))
            .dateEnd(LocalDate.of(2025, 1, 15))
            .timeStart(LocalTime.of(9, 0))
            .timeEnd(LocalTime.of(17, 0))
            .duration(60)
            .deadline(LocalDate.of(2025, 1, 20))
            .location("Room 1")
            .build();
        ReflectionTestUtils.setField(discussion1, "discussionStatus", DiscussionStatus.FINISHED);
        ReflectionTestUtils.setField(discussion1, "fixedDate", LocalDate.of(2025, 1, 1));
        entityManager.persist(discussion1);

        // Discussion 2: FINISHED, dateRangeEnd 연도 2025, fixedDate = 2025-02-01
        Discussion discussion2 = Discussion.builder()
            .title("Discussion 2")
            .dateStart(LocalDate.of(2025, 2, 5))
            .dateEnd(LocalDate.of(2025, 2, 10))
            .timeStart(LocalTime.of(10, 0))
            .timeEnd(LocalTime.of(18, 0))
            .duration(60)
            .deadline(LocalDate.of(2025, 2, 15))
            .location("Room 2")
            .build();
        ReflectionTestUtils.setField(discussion2, "discussionStatus", DiscussionStatus.FINISHED);
        ReflectionTestUtils.setField(discussion2, "fixedDate", LocalDate.of(2025, 2, 1));
        entityManager.persist(discussion2);

        // Discussion 3: FINISHED, 하지만 dateRangeEnd 연도가 2024 -> 필터링되어야 함
        Discussion discussion3 = Discussion.builder()
            .title("Discussion 3")
            .dateStart(LocalDate.of(2024, 12, 1))
            .dateEnd(LocalDate.of(2024, 12, 5))
            .timeStart(LocalTime.of(9, 0))
            .timeEnd(LocalTime.of(17, 0))
            .duration(60)
            .deadline(LocalDate.of(2024, 12, 10))
            .location("Room 3")
            .build();
        ReflectionTestUtils.setField(discussion3, "discussionStatus", DiscussionStatus.FINISHED);
        ReflectionTestUtils.setField(discussion3, "fixedDate", LocalDate.of(2024, 12, 1));
        entityManager.persist(discussion3);

        // Discussion 4: ONGOING 상태 -> 필터링되어야 함
        Discussion discussion4 = Discussion.builder()
            .title("Discussion 4")
            .dateStart(LocalDate.of(2025, 3, 1))
            .dateEnd(LocalDate.of(2025, 3, 5))
            .timeStart(LocalTime.of(10, 0))
            .timeEnd(LocalTime.of(18, 0))
            .duration(60)
            .deadline(LocalDate.of(2025, 3, 10))
            .location("Room 4")
            .build();
        ReflectionTestUtils.setField(discussion4, "discussionStatus", DiscussionStatus.ONGOING);
        ReflectionTestUtils.setField(discussion4, "fixedDate", LocalDate.of(2025, 3, 1));
        entityManager.persist(discussion4);

        // DiscussionParticipant 생성: user가 모든 Discussion에 참여하도록 생성
        DiscussionParticipant dp1 = DiscussionParticipant.builder()
            .discussion(discussion1)
            .user(user)
            .userOffset(0L)
            .build();
        entityManager.persist(dp1);

        DiscussionParticipant dp2 = DiscussionParticipant.builder()
            .discussion(discussion2)
            .user(user)
            .userOffset(1L)
            .build();
        entityManager.persist(dp2);

        DiscussionParticipant dp3 = DiscussionParticipant.builder()
            .discussion(discussion3)
            .user(user)
            .userOffset(2L)
            .build();
        entityManager.persist(dp3);

        DiscussionParticipant dp4 = DiscussionParticipant.builder()
            .discussion(discussion4)
            .user(user)
            .userOffset(3L)
            .build();
        entityManager.persist(dp4);

        entityManager.flush();
        entityManager.clear();

        // Pageable: 첫 페이지, size 10 (총 2건의 결과가 있어야 함: discussion1 & discussion2)
        Pageable pageable = PageRequest.of(0, 10);
        Page<Discussion> resultPage = discussionParticipantRepository.findFinishedDiscussions(
            user.getId(), pageable, 2025);
        List<Discussion> results = resultPage.getContent();

        // 검증: discussion3 (2024)와 discussion4 (ONGOING)는 필터링되어야 하므로, 결과는 2건
        assertThat(results).hasSize(2);
        // 정렬은 fixedDate ASC 기준이므로, discussion1(fixedDate=2025-01-01)이 먼저, 그 다음 discussion2(fixedDate=2025-02-01)
        assertThat(results.get(0).getId()).isEqualTo(discussion1.getId());
        assertThat(results.get(1).getId()).isEqualTo(discussion2.getId());
    }

    @Test
    @DisplayName("다가오는 논의")
    public void findUpcomingDiscussionsTest() {
        // 사용자 생성
        User user = User.builder()
            .name("Test User")
            .email("test@example.com")
            .picture("userpic.jpg")
            .build();
        entityManager.persist(user);

        // Discussion 1: FINISHED, dateRangeEnd 연도 2025, fixedDate = 2025-01-01
        Discussion discussion1 = Discussion.builder()
            .title("Discussion 1")
            .dateStart(LocalDate.of(2025, 1, 10))
            .dateEnd(LocalDate.of(2025, 1, 15))
            .timeStart(LocalTime.of(9, 0))
            .timeEnd(LocalTime.of(17, 0))
            .duration(60)
            .deadline(LocalDate.of(2025, 1, 20))
            .location("Room 1")
            .build();
        ReflectionTestUtils.setField(discussion1, "discussionStatus", DiscussionStatus.FINISHED);
        ReflectionTestUtils.setField(discussion1, "fixedDate", LocalDate.of(2025, 1, 1));
        entityManager.persist(discussion1);

        // Discussion 2: UPCOMING, dateRangeEnd 연도 2025, fixedDate = 2025-02-01
        Discussion discussion2 = Discussion.builder()
            .title("Discussion 2")
            .dateStart(LocalDate.of(2025, 2, 5))
            .dateEnd(LocalDate.of(2025, 2, 10))
            .timeStart(LocalTime.of(10, 0))
            .timeEnd(LocalTime.of(18, 0))
            .duration(60)
            .deadline(LocalDate.of(2025, 2, 15))
            .location("Room 2")
            .build();
        ReflectionTestUtils.setField(discussion2, "discussionStatus", DiscussionStatus.UPCOMING);
        entityManager.persist(discussion2);

        // Discussion 3: UPCOMING, 하지만 dateRangeEnd 연도가 2024 -> 필터링되어야 함
        Discussion discussion3 = Discussion.builder()
            .title("Discussion 3")
            .dateStart(LocalDate.of(2024, 12, 1))
            .dateEnd(LocalDate.of(2024, 12, 5))
            .timeStart(LocalTime.of(9, 0))
            .timeEnd(LocalTime.of(17, 0))
            .duration(60)
            .deadline(LocalDate.of(2024, 12, 10))
            .location("Room 3")
            .build();
        ReflectionTestUtils.setField(discussion3, "discussionStatus", DiscussionStatus.UPCOMING);
        entityManager.persist(discussion3);

        // Discussion 4: ONGOING 상태 -> 필터링되어야 함
        Discussion discussion4 = Discussion.builder()
            .title("Discussion 4")
            .dateStart(LocalDate.of(2025, 3, 1))
            .dateEnd(LocalDate.of(2025, 3, 5))
            .timeStart(LocalTime.of(10, 0))
            .timeEnd(LocalTime.of(18, 0))
            .duration(60)
            .deadline(LocalDate.of(2025, 3, 10))
            .location("Room 4")
            .build();
        ReflectionTestUtils.setField(discussion4, "discussionStatus", DiscussionStatus.ONGOING);
        ReflectionTestUtils.setField(discussion4, "fixedDate", LocalDate.of(2025, 3, 1));
        entityManager.persist(discussion4);

        // DiscussionParticipant 생성: user가 모든 Discussion에 참여하도록 생성
        DiscussionParticipant dp1 = DiscussionParticipant.builder()
            .discussion(discussion1)
            .user(user)
            .userOffset(0L)
            .build();
        entityManager.persist(dp1);

        DiscussionParticipant dp2 = DiscussionParticipant.builder()
            .discussion(discussion2)
            .user(user)
            .userOffset(1L)
            .build();
        entityManager.persist(dp2);

        DiscussionParticipant dp3 = DiscussionParticipant.builder()
            .discussion(discussion3)
            .user(user)
            .userOffset(2L)
            .build();
        entityManager.persist(dp3);

        DiscussionParticipant dp4 = DiscussionParticipant.builder()
            .discussion(discussion4)
            .user(user)
            .userOffset(3L)
            .build();
        entityManager.persist(dp4);

        entityManager.flush();
        entityManager.clear();

        // when

        List<Discussion> result = discussionParticipantRepository.findUpcomingDiscussionsByUserId(
            user.getId());

        assertThat(result).isNotNull();
        assertThat(result.size()).isEqualTo(2);
    }
}
