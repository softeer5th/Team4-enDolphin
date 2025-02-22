package endolphin.backend.global.scheduler;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

import endolphin.backend.domain.discussion.DiscussionRepository;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.enums.DiscussionStatus;
import endolphin.backend.domain.discussion.enums.MeetingMethod;
import endolphin.backend.domain.shared_event.SharedEventService;
import endolphin.backend.domain.shared_event.dto.SharedEventDto;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.redis.DiscussionBitmapService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
public class DiscussionStatusSchedulerTest {

    @Mock
    private DiscussionRepository discussionRepository;

    @Mock
    private SharedEventService sharedEventService;

    @Mock
    private DiscussionBitmapService discussionBitmapService;

    @InjectMocks
    private DiscussionStatusScheduler scheduler;

    @DisplayName("ONGOING 논의의 날짜 범위가 오늘보다 이전인 경우 상태를 FINISHED로 변경")
    @Test
    void updateStatus_ongoingDiscussion_dateRangeEndBeforeToday_updatesStatusToFinished() {
        LocalDate today = LocalDate.now();
        Discussion discussion = Discussion.builder()
            .title("Test Discussion")
            .dateStart(today.minusDays(10))
            .dateEnd(today.minusDays(1))
            .timeStart(LocalTime.of(9, 0))
            .timeEnd(LocalTime.of(10, 0))
            .duration(60)
            .deadline(today.plusDays(1))
            .meetingMethod(MeetingMethod.OFFLINE)
            .location("Room 1")
            .build();
        discussion.setDiscussionStatus(DiscussionStatus.ONGOING);
        ReflectionTestUtils.setField(discussion, "id", 1L);

        when(discussionBitmapService.deleteDiscussionBitmapsUsingScan(any(Long.class)))
            .thenReturn(CompletableFuture.completedFuture(null));


        discussion = scheduler.updateStatus(discussion, today);

        assertEquals(DiscussionStatus.FINISHED, discussion.getDiscussionStatus());
    }

    @DisplayName("UPCOMING 논의의 공유 일정 종료 시간이 오늘보다 이전인 경우 상태를 FINISHED로 변경")
    @Test
    void updateStatus_upcomingDiscussion_sharedEventEndDateBeforeToday_updatesStatusToFinished() {
        // Arrange
        LocalDate today = LocalDate.now();
        Discussion discussion = Discussion.builder()
            .title("Upcoming Discussion")
            .dateStart(today.plusDays(1))
            .dateEnd(today.plusDays(2))
            .timeStart(LocalTime.of(9, 0))
            .timeEnd(LocalTime.of(10, 0))
            .duration(60)
            .deadline(today.plusDays(3))
            .meetingMethod(MeetingMethod.ONLINE)
            .location(null)
            .build();
        discussion.setDiscussionStatus(DiscussionStatus.UPCOMING);

        SharedEventDto sharedEvent = mock(SharedEventDto.class);
        when(sharedEvent.endDateTime()).thenReturn(LocalDateTime.of(today.minusDays(1), LocalTime.of(23, 59, 59)));
        when(sharedEventService.getSharedEvent(discussion.getId())).thenReturn(sharedEvent);

        discussion = scheduler.updateStatus(discussion, today);

        assertEquals(DiscussionStatus.FINISHED, discussion.getDiscussionStatus());
    }

    @Test
    void updateStatus_discussionDoesNotMeetCriteria_noUpdate() {
        // Arrange
        LocalDate today = LocalDate.now();
        Discussion discussion = Discussion.builder()
            .title("Ongoing Discussion")
            .dateStart(today.minusDays(5))
            .dateEnd(today.plusDays(1)) // 종료일이 아직 도래하지 않음
            .timeStart(LocalTime.of(9, 0))
            .timeEnd(LocalTime.of(10, 0))
            .duration(60)
            .deadline(today.plusDays(2))
            .meetingMethod(MeetingMethod.OFFLINE)
            .location("Room 1")
            .build();
        discussion.setDiscussionStatus(DiscussionStatus.ONGOING);

        discussion = scheduler.updateStatus(discussion, today);

        assertNull(discussion);
        verify(discussionRepository, never()).saveAll(any());
    }

    @DisplayName("에러 발생해도 다른 논의의 상태를 업데이트")
    @Test
    void updateDiscussionStatusAtMidnight_handlesExceptionAndContinues() {
        LocalDate today = LocalDate.now();

        Discussion discussion1 = Discussion.builder()
            .title("Discussion 1")
            .dateStart(today.minusDays(10))
            .dateEnd(today.minusDays(1))
            .timeStart(LocalTime.of(9, 0))
            .timeEnd(LocalTime.of(10, 0))
            .duration(60)
            .deadline(today.plusDays(1))
            .meetingMethod(MeetingMethod.OFFLINE)
            .location("Room 1")
            .build();
        discussion1.setDiscussionStatus(DiscussionStatus.UPCOMING);
        ReflectionTestUtils.setField(discussion1, "id", 1L);

        Discussion discussion2 = Discussion.builder()
            .title("Discussion 2")
            .dateStart(today.minusDays(10))
            .dateEnd(today.minusDays(1))
            .timeStart(LocalTime.of(10, 0))
            .timeEnd(LocalTime.of(11, 0))
            .duration(60)
            .deadline(today.plusDays(1))
            .meetingMethod(MeetingMethod.OFFLINE)
            .location("Room 2")
            .build();
        discussion2.setDiscussionStatus(DiscussionStatus.ONGOING);
        ReflectionTestUtils.setField(discussion2, "id", 2L);

        when(discussionBitmapService.deleteDiscussionBitmapsUsingScan(any(Long.class)))
            .thenReturn(CompletableFuture.completedFuture(null));

        when(discussionRepository.findByDiscussionStatusNot(DiscussionStatus.FINISHED)).thenReturn(List.of(discussion1, discussion2));

        doThrow(new ApiException(ErrorCode.SHARED_EVENT_NOT_FOUND)).when(sharedEventService).getSharedEvent(discussion1.getId());

        scheduler.updateDiscussionStatusAtMidnight();

        verify(discussionRepository).saveAll(List.of(discussion2));
    }
}
