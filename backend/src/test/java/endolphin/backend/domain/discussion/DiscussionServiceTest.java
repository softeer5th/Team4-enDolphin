package endolphin.backend.domain.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.within;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
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
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
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
    void retrieveCandidateEventDetails_ValidRequest_ReturnsCorrectResponse() {
        // Given
        User currentUser = Mockito.mock(User.class);

        User participant1 = Mockito.mock(User.class);
        User participant2 = Mockito.mock(User.class);

        LocalDateTime now = LocalDateTime.of(2024, 2, 13, 12, 0);
        LocalDateTime searchStartTime = now.minusHours(3);  // 09:00
        LocalDateTime searchEndTime = now.plusHours(3);     // 15:00
        LocalDateTime startTime = now.minusHours(1);        // 11:00
        LocalDateTime endTime = now.plusHours(1);           // 13:00

        // discussionId 설정
        Long discussionId = 1L;

        // Mock User 객체들의 동작 정의
        given(currentUser.getId()).willReturn(1L);
        given(currentUser.getName()).willReturn("Current User");
        given(currentUser.getPicture()).willReturn("current_user.jpg");

        given(participant1.getId()).willReturn(2L);
        given(participant1.getName()).willReturn("Participant 1");
        given(participant1.getPicture()).willReturn("participant1.jpg");

        given(participant2.getId()).willReturn(3L);
        given(participant2.getName()).willReturn("Participant 2");
        given(participant2.getPicture()).willReturn("participant2.jpg");

//        PersonalEvent event1 = Mockito.mock(PersonalEvent.class);
//        PersonalEvent event2 = Mockito.mock(PersonalEvent.class);
//
//        // Mock Event 객체들의 동작 정의
//        // participant1의 이벤트 (검색 범위 내)
//        given(event1.getUser()).willReturn(participant1);
//        given(event1.getStartTime()).willReturn(now.plusHours(2));  // 14:00
//        given(event1.getEndTime()).willReturn(now.plusHours(3));    // 15:00
//        given(event1.getTitle()).willReturn("Meeting 1");
//
//        // participant2의 이벤트 (검색 범위 밖)
//        given(event2.getUser()).willReturn(participant2);
//        given(event2.getStartTime()).willReturn(now.plusHours(4));  // 16:00
//        given(event2.getEndTime()).willReturn(now.plusHours(5));    // 17:00
//        given(event2.getTitle()).willReturn("Meeting 2");

        // selectedUserIds 초기화 (participant1, participant2 선택)
        List<Long> selectedUserIds = Arrays.asList(2L);

        CandidateEventDetailsRequest request = new CandidateEventDetailsRequest(
            startTime,
            endTime,
            selectedUserIds
        );

        List<User> participants = Arrays.asList(currentUser, participant1, participant2);

        List<UserInfoWithPersonalEvents> personalEvents = Arrays.asList(
            new UserInfoWithPersonalEvents(
                currentUser.getId(),
                currentUser.getName(),
                currentUser.getPicture(),
                false,
                true,
                Collections.emptyList()
            ),
            new UserInfoWithPersonalEvents(
                participant1.getId(),
                participant1.getName(),
                participant1.getPicture(),
                false,
                true,
                Collections.emptyList()
            ),
            new UserInfoWithPersonalEvents(
                participant2.getId(),
                participant2.getName(),
                participant2.getPicture(),
                true,
                true,
                Collections.emptyList()
            )
        );

        given(userService.getCurrentUser()).willReturn(currentUser);
        given(discussionParticipantService.getUsersByDiscussionId(eq(discussionId)))
            .willReturn(participants);
        given(personalEventService.findUserInfoWithPersonalEventsByUsers(
            anyList(), any(LocalDateTime.class), any(LocalDateTime.class), any(LocalDateTime.class), any(LocalDateTime.class), any(Map.class)))
            .willReturn(personalEvents);

        // When
        CandidateEventDetailsResponse response = discussionService
            .retrieveCandidateEventDetails(discussionId, request);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.discussionId()).isEqualTo(discussionId);
        assertThat(response.startDateTime()).isEqualTo(startTime);
        assertThat(response.endDateTime()).isEqualTo(endTime);
        assertThat(response.participants()).hasSize(3);

        // 사용자 순서 검증 (현재 사용자가 첫 번째)
        assertThat(response.participants().get(0).id()).isEqualTo(currentUser.getId());
        assertThat(response.participants().get(0).events()).isEmpty();

        // participant2의 이벤트 검증
        assertThat(response.participants().get(1).id()).isEqualTo(participant2.getId());
        assertThat(response.participants().get(1).events()).isEmpty();


        // participant1의 이벤트 검증
        assertThat(response.participants().get(2).id()).isEqualTo(participant1.getId());
        assertThat(response.participants().get(2).events()).isEmpty();
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
        given(discussionParticipantService.getUsersByDiscussionId(discussionId))
            .willReturn(Collections.singletonList(otherUser));

        // When & Then
        assertThatThrownBy(
            () -> discussionService.retrieveCandidateEventDetails(discussionId, request))
            .isInstanceOf(ApiException.class)
            .hasFieldOrPropertyWithValue("errorCode", ErrorCode.INVALID_DISCUSSION_PARTICIPANT);

        // 날짜 범위 검증 단계에서 예외가 발생하므로 다른 서비스들은 호출되지 않아야 함
        then(personalEventService).shouldHaveNoInteractions();
    }
}
