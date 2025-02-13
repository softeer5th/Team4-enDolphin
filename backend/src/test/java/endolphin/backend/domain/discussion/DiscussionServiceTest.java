package endolphin.backend.domain.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.within;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.atLeast;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import endolphin.backend.domain.discussion.dto.CandidateEventDetailsRequest;
import endolphin.backend.domain.discussion.dto.CandidateEventDetailsResponse;
import endolphin.backend.domain.discussion.dto.CreateDiscussionRequest;
import endolphin.backend.domain.discussion.dto.DiscussionResponse;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.enums.DiscussionStatus;
import endolphin.backend.domain.discussion.enums.MeetingMethod;
import endolphin.backend.domain.personal_event.PersonalEventService;
import endolphin.backend.domain.personal_event.dto.PersonalEventWithStatus;
import endolphin.backend.domain.shared_event.SharedEventService;
import endolphin.backend.domain.shared_event.dto.SharedEventRequest;
import endolphin.backend.domain.shared_event.dto.SharedEventDto;
import endolphin.backend.domain.shared_event.dto.SharedEventWithDiscussionInfoResponse;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.dto.UserInfoWithPersonalEvents;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.redis.DiscussionBitmapService;
import endolphin.backend.global.security.PasswordEncoder;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
public class DiscussionServiceTest {

    @Mock
    private DiscussionRepository discussionRepository;

    @Mock
    private UserService userService;

    @Mock
    private SharedEventService sharedEventService;

    @Mock
    private PersonalEventService personalEventService;

    @Mock
    private DiscussionBitmapService discussionBitmapService;

    @Mock
    private DiscussionParticipantService discussionParticipantService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private DiscussionService discussionService;

    @DisplayName("필드값이 다 채워진 Discussion create 테스트")
    @Test
    public void createDiscussion_withValidRequest_returnsExpectedResponse() {
        CreateDiscussionRequest request = new CreateDiscussionRequest(
            "팀 회의",
            LocalDate.of(2025, 2, 10),
            LocalDate.of(2025, 2, 15),
            LocalTime.of(9, 0),
            LocalTime.of(18, 0),
            60,
            MeetingMethod.OFFLINE,
            "회의실 1",
            LocalDate.now().plusDays(10),
            null
        );

        given(discussionRepository.save(any(Discussion.class))).willAnswer(invocation -> {
            Discussion disc = invocation.getArgument(0);
            ReflectionTestUtils.setField(disc, "id", 100L);
            return disc;
        });

        User dummyUser = new User();
        ReflectionTestUtils.setField(dummyUser, "id", 1L);
        given(userService.getCurrentUser()).willReturn(dummyUser);

        // when
        DiscussionResponse response = discussionService.createDiscussion(request);

        // then
        assertThat(response).isNotNull();
        assertThat(response.id()).isEqualTo(100L);
        assertThat(response.title()).isEqualTo("팀 회의");
        assertThat(response.dateRangeStart()).isEqualTo(LocalDate.of(2025, 2, 10));
        assertThat(response.dateRangeEnd()).isEqualTo(LocalDate.of(2025, 2, 15));
        assertThat(response.meetingMethod()).isEqualTo(MeetingMethod.OFFLINE);
        assertThat(response.location()).isEqualTo("회의실 1");
        assertThat(response.duration()).isEqualTo(60);
        long timeLeft = Duration.between(LocalDateTime.now(), request.deadline().atTime(23, 59, 59))
            .toMillis();
        assertThat(response.timeLeft()).isCloseTo(timeLeft, within(1000L));
    }

    @DisplayName("Discussion 일정 확정 테스트")
    @Test
    public void confirmSchedule_withValidRequest_returnsExpectedResponse() {
        Long discussionId = 1L;
        Discussion discussion = Discussion.builder()
            .title("Project Sync")
            .meetingMethod(MeetingMethod.ONLINE)
            .build();

        discussion.setDiscussionStatus(DiscussionStatus.ONGOING);

        SharedEventRequest request = new SharedEventRequest(
            LocalDateTime.of(2025, 3, 1, 10, 0),
            LocalDateTime.of(2025, 3, 1, 12, 0)
        );

        SharedEventDto sharedEventDto = new SharedEventDto(
            101L,
            request.startDateTime(),
            request.endDateTime()
        );

        List<User> dummyParticipants = List.of(
            User.builder().name("Bob").email("email1").picture("picA").build(),
            User.builder().name("Alice").email("email2").picture("picB").build()
        );

        List<String> participantPictures = dummyParticipants.stream().map(User::getPicture)
            .toList();

        when(discussionRepository.findById(discussionId)).thenReturn(Optional.of(discussion));
        when(sharedEventService.createSharedEvent(discussion, request)).thenReturn(
            sharedEventDto);
        when(discussionParticipantService.getUsersByDiscussionId(discussionId))
            .thenReturn(dummyParticipants);

        when(discussionBitmapService.deleteDiscussionBitmapsUsingScan(
            any(Long.class)
        )).thenReturn(CompletableFuture.completedFuture(null));

        SharedEventWithDiscussionInfoResponse response = discussionService.confirmSchedule(
            discussionId, request);

        assertThat(response).isNotNull();
        assertThat(response.discussionId()).isEqualTo(discussionId);
        assertThat(response.title()).isEqualTo("Project Sync");
        assertThat(response.meetingMethodOrLocation()).isEqualTo("ONLINE");
        assertThat(response.sharedEventDto().id()).isEqualTo(101L);

        assertThat(response.participantPictureUrls()).containsExactlyElementsOf(
            participantPictures);

        verify(discussionRepository).findById(discussionId);
        verify(sharedEventService).createSharedEvent(discussion, request);

        verify(discussionParticipantService).getUsersByDiscussionId(discussionId);
    }

    @DisplayName("논의 확정 비동기 작업 실패 시 응답 확인")
    @Test
    public void confirmSchedule_asyncFailureHandledGracefully() {
        // Given
        Long discussionId = 1L;
        Discussion discussion = Discussion.builder()
            .title("Project Sync")
            .meetingMethod(MeetingMethod.ONLINE)
            .build();

        discussion.setDiscussionStatus(DiscussionStatus.ONGOING);

        SharedEventRequest request = new SharedEventRequest(
            LocalDateTime.of(2025, 3, 1, 10, 0),
            LocalDateTime.of(2025, 3, 1, 12, 0)
        );

        SharedEventDto sharedEventDto = new SharedEventDto(
            101L,
            request.startDateTime(),
            request.endDateTime()
        );

        List<User> dummyParticipants = List.of(
            User.builder().name("Bob").email("email1").picture("picA").build(),
            User.builder().name("Alice").email("email2").picture("picB").build()
        );

        // 정상 데이터 반환 설정
        when(discussionRepository.findById(discussionId)).thenReturn(Optional.of(discussion));
        when(sharedEventService.createSharedEvent(discussion, request)).thenReturn(sharedEventDto);
        when(discussionParticipantService.getUsersByDiscussionId(discussionId))
            .thenReturn(dummyParticipants);

        when(discussionBitmapService.deleteDiscussionBitmapsUsingScan(any()))
            .thenReturn(CompletableFuture.failedFuture(new RuntimeException("Redis Error")));

        // When
        SharedEventWithDiscussionInfoResponse response = discussionService.confirmSchedule(
            discussionId, request
        );

        // Then
        assertThat(response).isNotNull();
        assertThat(response.discussionId()).isEqualTo(discussionId);
        assertThat(response.title()).isEqualTo("Project Sync");

        verify(discussionRepository).findById(discussionId);
        verify(sharedEventService).createSharedEvent(discussion, request);
        verify(discussionParticipantService).getUsersByDiscussionId(discussionId);
        verify(personalEventService).createPersonalEventsForParticipants(
            dummyParticipants, discussion, sharedEventDto
        );
        verify(discussionBitmapService).deleteDiscussionBitmapsUsingScan(discussionId);
    }

    @DisplayName("논의 확정 시 논의 상태가 ONGOING이 아닌 경우 예외 발생")
    @Test
    public void confirmSchedule_whenDiscussionNotOngoing_throwsApiException() {
        // Given
        Long discussionId = 1L;
        // ONGOING이 아닌 상태로 설정 (예: CREATED)
        Discussion discussion = Discussion.builder()
            .title("Test Discussion")
            .meetingMethod(MeetingMethod.ONLINE)
            .build();

        discussion.setDiscussionStatus(DiscussionStatus.FINISHED);
        when(discussionRepository.findById(discussionId)).thenReturn(Optional.of(discussion));

        SharedEventRequest request = new SharedEventRequest(
            LocalDateTime.of(2025, 3, 1, 10, 0),
            LocalDateTime.of(2025, 3, 1, 12, 0)
        );

        // When & Then
        assertThatThrownBy(() -> discussionService.confirmSchedule(discussionId, request))
            .isInstanceOf(ApiException.class)
            .hasFieldOrPropertyWithValue("errorCode", ErrorCode.DISCUSSION_NOT_ONGOING);
    }


    @DisplayName("Discussion 생성 시 password 처리 테스트")
    @Test
    public void createDiscussion_withPassword_setsEncodedPassword() {
        // password 필드가 추가된 CreateDiscussionRequest 생성 (password: "secretPassword")
        CreateDiscussionRequest request = new CreateDiscussionRequest(
            "팀 회의",
            LocalDate.of(2025, 2, 10),
            LocalDate.of(2025, 2, 15),
            LocalTime.of(9, 0),
            LocalTime.of(18, 0),
            60,
            MeetingMethod.OFFLINE,
            "회의실 1",
            LocalDate.now().plusDays(10),
            "secretPassword"
        );

        given(discussionRepository.save(any(Discussion.class))).willAnswer(invocation -> {
            Discussion disc = invocation.getArgument(0);
            if (disc.getId() == null) {
                ReflectionTestUtils.setField(disc, "id", 100L);
            }
            return disc;
        });

        when(passwordEncoder.encode(100L, "secretPassword")).thenReturn("encodedPassword");

        User dummyUser = new User();
        ReflectionTestUtils.setField(dummyUser, "id", 1L);
        given(userService.getCurrentUser()).willReturn(dummyUser);

        // when
        DiscussionResponse response = discussionService.createDiscussion(request);

        // then
        assertThat(response).isNotNull();
        assertThat(response.id()).isEqualTo(100L);
        assertThat(response.title()).isEqualTo("팀 회의");
        assertThat(response.dateRangeStart()).isEqualTo(LocalDate.of(2025, 2, 10));
        assertThat(response.dateRangeEnd()).isEqualTo(LocalDate.of(2025, 2, 15));
        assertThat(response.meetingMethod()).isEqualTo(MeetingMethod.OFFLINE);
        assertThat(response.location()).isEqualTo("회의실 1");
        assertThat(response.duration()).isEqualTo(60);

        // passwordEncoder.encode가 올바른 인자로 호출되었음을 검증
        verify(passwordEncoder).encode(100L, "secretPassword");
        // discussionRepository.save가 두 번 호출되었는지 확인 (최초 저장, 비밀번호 업데이트)
        verify(discussionRepository, atLeast(2)).save(any(Discussion.class));
    }

    @Test
    @DisplayName("토론 참여자별 일정 상세 정보를 조회한다")
    void retrieveCandidateEventDetails() {
        // given
        Long discussionId = 1L;
        LocalDateTime now = LocalDateTime.of(2024, 2, 13, 12, 0);
        LocalDateTime startTime = now;
        LocalDateTime endTime = now.plusHours(2);
        LocalDateTime searchStartTime = now.minusHours(4);
        LocalDateTime searchEndTime = now.plusHours(6);

        // Mock 사용자 데이터 생성
        User currentUser = mock(User.class);
        User participant1 = mock(User.class);
        User participant2 = mock(User.class);

        // Mock 사용자 데이터 설정
        given(currentUser.getId()).willReturn(1L);
        given(currentUser.getName()).willReturn("Current User");
        given(currentUser.getPicture()).willReturn("current.jpg");

        given(participant1.getId()).willReturn(2L);
        given(participant1.getName()).willReturn("Participant 1");
        given(participant1.getPicture()).willReturn("p1.jpg");

        given(participant2.getId()).willReturn(3L);
        given(participant2.getName()).willReturn("Participant 2");
        given(participant2.getPicture()).willReturn("p2.jpg");

        // 요청 객체 생성
        CandidateEventDetailsRequest request = new CandidateEventDetailsRequest(startTime, endTime,
            List.of(1L,
                2L, 3L));
        List<User> participants = List.of(currentUser, participant1, participant2);

        // Mock 서비스 동작 설정
        given(userService.getCurrentUser()).willReturn(currentUser);
        given(discussionParticipantService.getUsersByDiscussionIdOrderByCreatedAt(discussionId))
            .willReturn(participants);

        // Mock 개인 일정 데이터 설정
        Map<Long, List<PersonalEventWithStatus>> personalEvents = new HashMap<>();
        personalEvents.put(1L, List.of(mock(PersonalEventWithStatus.class)));
        personalEvents.put(2L, List.of(mock(PersonalEventWithStatus.class)));
        personalEvents.put(3L, List.of(mock(PersonalEventWithStatus.class)));

        given(personalEventService.findPersonalEventStatusesByUsers(
            eq(participants),
            any(LocalDateTime.class),
            any(LocalDateTime.class),
            eq(startTime),
            eq(endTime)
        )).willReturn(personalEvents);

        // when
        CandidateEventDetailsResponse response = discussionService
            .retrieveCandidateEventDetails(discussionId, request);

        // then
        assertThat(response).isNotNull();
        assertThat(response.discussionId()).isEqualTo(discussionId);
        assertThat(response.startDateTime()).isEqualTo(startTime);
        assertThat(response.endDateTime()).isEqualTo(endTime);

        List<UserInfoWithPersonalEvents> users = response.participants();
        assertThat(users).hasSize(3);

        // 현재 사용자가 첫 번째로 정렬되었는지 확인
        assertThat(users.get(0).id()).isEqualTo(currentUser.getId());
        assertThat(users.get(0).name()).isEqualTo(currentUser.getName());
        assertThat(users.get(0).picture()).isEqualTo(currentUser.getPicture());

        // 나머지 참여자들이 순서대로 정렬되었는지 확인
        assertThat(users.get(1).id()).isEqualTo(participant1.getId());
        assertThat(users.get(1).name()).isEqualTo(participant1.getName());
        assertThat(users.get(2).id()).isEqualTo(participant2.getId());
        assertThat(users.get(2).name()).isEqualTo(participant2.getName());
    }

    @Test
    @DisplayName("후보 일정 가져오기 시간 범위 예외 발생")
    public void testRetrieveCandidateEventDetails_error_timeRange() {
        // Given
        Long discussionId = 1L;
        LocalDateTime startDateTime = LocalDateTime.of(2025, 2, 12, 10, 0);
        LocalDateTime endDateTime = LocalDateTime.of(2025, 2, 12, 8, 0);
        List<Long> selectedUserIdList = Arrays.asList(1L, 3L);
        CandidateEventDetailsRequest request = new CandidateEventDetailsRequest(startDateTime,
            endDateTime, selectedUserIdList);

        // When & Then
        assertThatThrownBy(
            () -> discussionService.retrieveCandidateEventDetails(discussionId, request))
            .isInstanceOf(ApiException.class)
            .hasFieldOrPropertyWithValue("errorCode", ErrorCode.INVALID_DATE_TIME_RANGE);

        // 날짜 범위 검증 단계에서 예외가 발생하므로 다른 서비스들은 호출되지 않아야 함
        then(userService).shouldHaveNoInteractions();
        then(discussionParticipantService).shouldHaveNoInteractions();
        then(personalEventService).shouldHaveNoInteractions();
    }

    @Test
    @DisplayName("후보 일정 가져오기, 논의에 포함되지 않는 사용자 예외")
    public void testRetrieveCandidateEventDetails_error_userParticipant() {
        // Given
        Long discussionId = 1L;
        LocalDateTime startDateTime = LocalDateTime.of(2025, 2, 12, 10, 0);
        LocalDateTime endDateTime = LocalDateTime.of(2025, 2, 12, 12, 0);
        List<Long> selectedUserIdList = Arrays.asList(1L, 3L);
        CandidateEventDetailsRequest request = new CandidateEventDetailsRequest(startDateTime,
            endDateTime, selectedUserIdList);

        User currentUser = mock(User.class);

        User otherUser = mock(User.class);

        given(userService.getCurrentUser()).willReturn(currentUser);
        given(discussionParticipantService.getUsersByDiscussionIdOrderByCreatedAt(discussionId))
            .willReturn(Collections.singletonList(otherUser));

        // When & Then
        assertThatThrownBy(
            () -> discussionService.retrieveCandidateEventDetails(discussionId, request))
            .isInstanceOf(ApiException.class)
            .hasFieldOrPropertyWithValue("errorCode", ErrorCode.DISCUSSION_PARTICIPANT_NOT_FOUND);

        // 날짜 범위 검증 단계에서 예외가 발생하므로 다른 서비스들은 호출되지 않아야 함
        then(personalEventService).shouldHaveNoInteractions();
    }
}
