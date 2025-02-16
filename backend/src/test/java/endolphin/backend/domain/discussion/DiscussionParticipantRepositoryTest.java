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
        List<Long> offsets = Arrays.asList(1L, 2L);
        List<Long> userIds = discussionParticipantRepository.findUserIdsByDiscussionIdAndOffset(discussion.getId(), offsets);
        // 예상: user2와 user3의 ID
        assertThat(userIds).containsExactlyInAnyOrder(user2.getId(), user3.getId());
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
}
