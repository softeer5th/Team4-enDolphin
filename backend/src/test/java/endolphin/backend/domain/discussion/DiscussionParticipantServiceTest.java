package endolphin.backend.domain.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

import endolphin.backend.domain.discussion.dto.OngoingDiscussion;
import endolphin.backend.domain.discussion.dto.OngoingDiscussionsResponse;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.enums.DiscussionStatus;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.dto.UserIdNameDto;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
class DiscussionParticipantServiceTest {

    @Mock
    private DiscussionParticipantRepository discussionParticipantRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private DiscussionParticipantService discussionParticipantService;

    @Test
    @DisplayName("논의 참여자 추가 - 성공")
    void addDiscussionParticipant_ShouldAddSuccessfully() {
        // Given
        Discussion discussion = Discussion.builder()
            .title("Test Discussion")
            .dateStart(LocalDate.now())
            .dateEnd(LocalDate.now().plusDays(1))
            .timeStart(LocalTime.of(9, 0))
            .timeEnd(LocalTime.of(18, 0))
            .duration(60)
            .deadline(LocalDate.now().plusDays(2))
            .build();

        User user = User.builder()
            .name("John Doe")
            .email("john@example.com")
            .picture("profile.jpg")
            .build();

        given(discussionParticipantRepository.findMaxOffsetByDiscussionId(discussion.getId()))
            .willReturn(0L);

        // When
        discussionParticipantService.addDiscussionParticipant(discussion, user);

        // Then
        verify(discussionParticipantRepository).save(any());
    }

    @Test
    @DisplayName("논의 참여자 추가 - 최대 인원 초과 시 예외 발생")
    void addDiscussionParticipant_ShouldThrowExceptionWhenExceedLimit() {
        // Given
        Discussion discussion = Discussion.builder()
            .title("Full Discussion")
            .dateStart(LocalDate.now())
            .dateEnd(LocalDate.now().plusDays(1))
            .timeStart(LocalTime.of(9, 0))
            .timeEnd(LocalTime.of(18, 0))
            .duration(60)
            .deadline(LocalDate.now().plusDays(2))
            .build();

        User user = User.builder()
            .name("Jane Doe")
            .email("jane@example.com")
            .picture("profile.jpg")
            .build();

        given(discussionParticipantRepository.findMaxOffsetByDiscussionId(discussion.getId()))
            .willReturn(15L); // 최대 인원 초과 상황

        // When & Then
        ApiException exception = assertThrows(ApiException.class, () -> {
            discussionParticipantService.addDiscussionParticipant(discussion, user);
        });

        assertThat(exception.getErrorCode()).isEqualTo(
            ErrorCode.DISCUSSION_PARTICIPANT_EXCEED_LIMIT);
    }

    @Test
    @DisplayName("논의 ID로 참여자 목록 조회")
    void getUsersByDiscussionId_ShouldReturnUsers() {
        // Given
        Long discussionId = 1L;
        User user1 = User.builder().name("Alice").email("alice@example.com").picture("alice.jpg")
            .build();
        User user2 = User.builder().name("Bob").email("bob@example.com").picture("bob.jpg").build();

        given(discussionParticipantRepository.findUsersByDiscussionId(discussionId))
            .willReturn(Arrays.asList(user1, user2));

        // When
        List<User> users = discussionParticipantService.getUsersByDiscussionId(discussionId);

        // Then
        assertThat(users).hasSize(2);
        assertThat(users).containsExactly(user1, user2);
    }

    @Test
    @DisplayName("사용자의 논의 참여자 Offset 조회 - 성공")
    void getDiscussionParticipantOffset_ShouldReturnOffset() {
        // Given
        Long discussionId = 1L;
        Long userId = 1L;
        Long expectedOffset = 3L;

        given(
            discussionParticipantRepository.findOffsetByDiscussionIdAndUserId(discussionId, userId))
            .willReturn(Optional.of(expectedOffset));

        // When
        Long offset = discussionParticipantService.getDiscussionParticipantOffset(discussionId,
            userId);

        // Then
        assertThat(offset).isEqualTo(expectedOffset);
    }

    @Test
    @DisplayName("사용자의 논의 참여자 Offset 조회 - 존재하지 않을 경우 예외 발생")
    void getDiscussionParticipantOffset_ShouldThrowExceptionIfNotFound() {
        // Given
        Long discussionId = 1L;
        Long userId = 2L;

        given(
            discussionParticipantRepository.findOffsetByDiscussionIdAndUserId(discussionId, userId))
            .willReturn(Optional.empty());

        // When & Then
        ApiException exception = assertThrows(ApiException.class, () -> {
            discussionParticipantService.getDiscussionParticipantOffset(discussionId, userId);
        });

        assertThat(exception.getErrorCode()).isEqualTo(ErrorCode.DISCUSSION_PARTICIPANT_NOT_FOUND);
    }

    @Test
    @DisplayName("논의 참여자들의 Offset 기반 필터 반환")
    void getFilter_ShouldReturnCorrectBitMask() {
        // Given
        Long discussionId = 1L;
        List<Long> userIds = Arrays.asList(1L, 2L, 3L);
        List<Long> offsets = Arrays.asList(0L, 3L, 8L);

        given(discussionParticipantRepository.findOffsetsByDiscussionIdAndUserIds(discussionId,
            userIds))
            .willReturn(offsets);

        // When
        int filter = discussionParticipantService.getFilter(discussionId, userIds);

        // Then
        int expectedFilter = (1 << 15) | (1 << 12) | (1 << 7); // 0, 3, 8에 해당하는 비트만 1인 필터
        assertThat(filter).isEqualTo(expectedFilter);
    }

    @Test
    @DisplayName("논의 참여자 데이터로부터 사용자 목록 반환")
    void getUsersFromData_ShouldReturnUserIdNameDtos() {
        // Given
        Long discussionId = 1L;
        // 테스트용 data: 오프셋 0, 3, 8이 set되어 있다고 가정
        int data = (1 << 15) | (1 << 12) | (1 << 7);
        // 위의 data를 바탕으로, 내부에서 생성되는 userOffsets는 [0, 3, 8]이어야 함.
        List<Long> expectedOffsets = Arrays.asList(0L, 3L, 8L);
        List<Long> userIds = Arrays.asList(10L, 20L, 30L);
        given(discussionParticipantRepository.findUserIdsByDiscussionIdAndOffset(discussionId,
            expectedOffsets))
            .willReturn(userIds);

        List<UserIdNameDto> dtos = Arrays.asList(
            new UserIdNameDto(10L, "User10"),
            new UserIdNameDto(20L, "User20"),
            new UserIdNameDto(30L, "User30")
        );
        given(userService.getUserIdNameInIds(userIds)).willReturn(dtos);

        // When
        List<UserIdNameDto> result = discussionParticipantService.getUsersFromData(discussionId,
            data);

        // Then
        assertThat(result).isEqualTo(dtos);
    }

    @Test
    @DisplayName("호스트 이름 조회 - 성공")
    void getHostNameByDiscussionId_ShouldReturnHostName() {
        Long discussionId = 1L;
        String hostName = "HostName";
        given(discussionParticipantRepository.findHostNameByDiscussionIdAndIsHost(discussionId))
            .willReturn(Optional.of(hostName));

        String result = discussionParticipantService.getHostNameByDiscussionId(discussionId);

        assertThat(result).isEqualTo(hostName);
    }

    @Test
    @DisplayName("호스트 이름 조회 - 존재하지 않을 경우 예외 발생")
    void getHostNameByDiscussionId_ShouldThrowExceptionIfNotFound() {
        Long discussionId = 1L;
        given(discussionParticipantRepository.findHostNameByDiscussionIdAndIsHost(discussionId))
            .willReturn(Optional.empty());

        ApiException exception = assertThrows(ApiException.class, () ->
            discussionParticipantService.getHostNameByDiscussionId(discussionId)
        );
        assertThat(exception.getErrorCode()).isEqualTo(ErrorCode.DISCUSSION_HOST_NOT_FOUND);
    }

    @Test
    @DisplayName("논의가 꽉 차지 않았을 때 isFull이 false를 반환")
    void isFull_ShouldReturnFalseWhenOffsetLessThanLimit() {
        Long discussionId = 1L;
        given(discussionParticipantRepository.findMaxOffsetByDiscussionId(discussionId))
            .willReturn(10L);

        Boolean result = discussionParticipantService.isFull(discussionId);

        assertThat(result).isFalse();
    }

    @Test
    @DisplayName("논의가 꽉 찼을 때 isFull이 true를 반환")
    void isFull_ShouldReturnTrueWhenOffsetAtOrAboveLimit() {
        Long discussionId = 1L;
        given(discussionParticipantRepository.findMaxOffsetByDiscussionId(discussionId))
            .willReturn(14L);

        Boolean result = discussionParticipantService.isFull(discussionId);

        assertThat(result).isTrue();
    }

    @DisplayName("진행 중인 논의 목록 조회 - 페이징(1,1) 테스트")
    @Test
    public void testGetOngoingDiscussions_Pagination() {
        Long userId = 1L;
        int page = 1;  // 두 번째 페이지
        int size = 1;  // 한 건씩 반환
        Boolean isHost = true;

        // 첫 번째 Discussion 생성
        Discussion discussion1 = Discussion.builder()
            .title("Discussion 1")
            .dateStart(LocalDate.of(2025, 2, 10))
            .dateEnd(LocalDate.of(2025, 2, 15))
            .timeStart(LocalTime.of(9, 0))
            .timeEnd(LocalTime.of(17, 0))
            .duration(60)
            .deadline(LocalDate.of(2025, 2, 20))
            .location("Room 1")
            .build();
        ReflectionTestUtils.setField(discussion1, "discussionStatus", DiscussionStatus.ONGOING);
        ReflectionTestUtils.setField(discussion1, "id", 100L);

        // 두 번째 Discussion 생성
        Discussion discussion2 = Discussion.builder()
            .title("Discussion 2")
            .dateStart(LocalDate.of(2025, 2, 1))
            .dateEnd(LocalDate.of(2025, 3, 5))
            .timeStart(LocalTime.of(10, 0))
            .timeEnd(LocalTime.of(18, 0))
            .duration(60)
            .deadline(LocalDate.of(2025, 3, 10))
            .location("Room 2")
            .build();
        ReflectionTestUtils.setField(discussion2, "discussionStatus", DiscussionStatus.ONGOING);
        ReflectionTestUtils.setField(discussion2, "id", 101L);

        // Repository가 페이지 1, 사이즈 1로 두 번째 Discussion만 반환하도록 PageImpl 생성
        Page<Discussion> pagedDiscussionPage = new PageImpl<>(
            List.of(discussion2),
            PageRequest.of(page, size),
            2 // 전체 결과 건수
        );

        given(discussionParticipantRepository.findOngoingDiscussions(userId, isHost,
            PageRequest.of(page, size)))
            .willReturn(pagedDiscussionPage);

        // 두 번째 Discussion에 대한 참여자 사진 설정
        List<String> pictures2 = Arrays.asList("pic3.jpg", "pic4.jpg");
        given(discussionParticipantRepository.findUserPicturesByDiscussionId(101L))
            .willReturn(pictures2);

        // When: Service 메서드 호출

        OngoingDiscussionsResponse response = discussionParticipantService.getOngoingDiscussions(
            userId, page, size, isHost);

        List<OngoingDiscussion> ods = response.ongoingDiscussions();

        assertThat(response.currentPage()).isEqualTo(page + 1);
        assertThat(response.totalPages()).isEqualTo(2);
        assertThat(response.hasNext()).isFalse();
        assertThat(response.hasPrevious()).isTrue();
        // Then: 페이징 결과가 두 번째 Discussion만 포함하는지 검증
        assertThat(ods).hasSize(1);
        OngoingDiscussion od = ods.get(0);
        assertThat(od.discussionId()).isEqualTo(101L);
        assertThat(od.title()).isEqualTo("Discussion 2");
        assertThat(od.dateRangeStart()).isEqualTo(LocalDate.of(2025, 2, 1));
        assertThat(od.dateRangeEnd()).isEqualTo(LocalDate.of(2025, 3, 5));
        assertThat(od.participantPictureUrls()).isEqualTo(pictures2);
    }

}
