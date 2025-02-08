package endolphin.backend.domain.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.within;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import endolphin.backend.domain.discussion.dto.CreateDiscussionRequest;
import endolphin.backend.domain.discussion.dto.DiscussionResponse;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.enums.MeetingMethod;
import endolphin.backend.domain.personal_event.PersonalEventService;
import endolphin.backend.domain.shared_event.SharedEventService;
import endolphin.backend.domain.shared_event.dto.SharedEventRequest;
import endolphin.backend.domain.shared_event.dto.SharedEventDto;
import endolphin.backend.domain.shared_event.dto.SharedEventWithDiscussionInfoResponse;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.redis.DiscussionBitmapService;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
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
            LocalDate.now().plusDays(10)
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

        when(personalEventService.createPersonalEventsForParticipants(
            anyList(), any(Discussion.class), any(SharedEventDto.class)
        )).thenReturn(CompletableFuture.completedFuture(null));

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

    @DisplayName("논의 확정 후 비동기 작업 실패 시 처리 확인")
    @Test
    public void confirmSchedule_asyncFailureHandledGracefully() {
        // Given
        Long discussionId = 1L;
        Discussion discussion = Discussion.builder()
            .title("Project Sync")
            .meetingMethod(MeetingMethod.ONLINE)
            .build();

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

        // 비동기 작업 실패 시뮬레이션
        when(personalEventService.createPersonalEventsForParticipants(
            anyList(), any(Discussion.class), any(SharedEventDto.class)
        )).thenReturn(CompletableFuture.failedFuture(new RuntimeException("DB Error")));

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

}
