package endolphin.backend.domain.personal_event;

import static org.mockito.BDDMockito.*;

import endolphin.backend.domain.discussion.DiscussionParticipantService;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.enums.DiscussionStatus;
import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.redis.DiscussionBitmapService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class PersonalEventPreprocessorTest {

    @Mock
    private DiscussionBitmapService discussionBitmapService;
    @Mock
    private DiscussionParticipantService discussionParticipantService;
    @InjectMocks
    private PersonalEventPreprocessor preprocessor;

    @Test
    @DisplayName("날짜 동일, 시간 범위 내에 있는 경우")
    void testPreprocessCallsSetBitValueWithCorrectTimes() {
        // given
        Long userId = 200L;
        Long participantIndex = 2L;

        // Discussion, User, PersonalEvent 모킹
        Discussion discussion = getDiscussion();
        User user = getUser();

        given(discussionParticipantService.getDiscussionParticipantOffset(anyLong(), anyLong()))
            .willReturn(participantIndex);

        // count : 2
        PersonalEvent personalEvent = mock(PersonalEvent.class);
        given(personalEvent.getStartTime()).willReturn(LocalDateTime.of(2024, 3, 15, 13, 0));
        given(personalEvent.getEndTime()).willReturn(LocalDateTime.of(2024, 3, 15, 14, 0));
        given(personalEvent.getId()).willReturn(1L);

        // when
        preprocessor.preprocess(List.of(personalEvent), discussion, user);

        // then
        then(discussionBitmapService).should(times(2)).setBitValue(anyLong(), any(LocalDateTime.class), anyLong(), anyBoolean());
    }

    @Test
    @DisplayName("날짜 범위 밖에 있는 경우")
    public void test2() {
        // given
        Long userId = 200L;
        Long participantIndex = 2L;
        // Discussion, User, PersonalEvent 모킹
        Discussion discussion = getAnotherDiscussion();
        User user = getUser();

        given(discussionParticipantService.getDiscussionParticipantOffset(anyLong(), anyLong()))
            .willReturn(participantIndex);

        // count : 0
        PersonalEvent personalEvent = mock(PersonalEvent.class);
        given(personalEvent.getStartTime()).willReturn(LocalDateTime.of(2024, 3, 8, 8, 0, 0));
        given(personalEvent.getEndTime()).willReturn(LocalDateTime.of(2024, 3, 9, 12, 0, 0));

        // when
        preprocessor.preprocessOne(personalEvent, discussion, user, true);

        // then
        then(discussionBitmapService).should(times(0)).setBitValue(anyLong(), any(LocalDateTime.class), anyLong(), anyBoolean());
    }

    @Test
    @DisplayName("날짜 범위가 걸쳐있는 경우")
    public void test3() {
        // given
        Long userId = 200L;
        Long participantIndex = 2L;
        // Discussion, User, PersonalEvent 모킹
        Discussion discussion = getDiscussion();
        User user = getUser();

        given(discussionParticipantService.getDiscussionParticipantOffset(anyLong(), anyLong()))
            .willReturn(participantIndex);

        // count : 6 + 6 + 2 = 14
        PersonalEvent personalEvent = mock(PersonalEvent.class);
        given(personalEvent.getStartTime()).willReturn(LocalDateTime.of(2024, 3, 8, 8, 0, 0));
        given(personalEvent.getEndTime()).willReturn(LocalDateTime.of(2024, 3, 12, 13, 0, 0));
        given(personalEvent.getId()).willReturn(3L);

        // when
        preprocessor.preprocess(List.of(personalEvent), discussion, user);

        // then
        then(discussionBitmapService).should(times(14)).setBitValue(anyLong(), any(LocalDateTime.class), anyLong(), anyBoolean());
    }

    @Test
    @DisplayName("날짜 범위를 모두 포함하는 경우")
    public void test4() {
        // given
        Long userId = 200L;
        Long participantIndex = 2L;
        // Discussion, User, PersonalEvent 모킹
        Discussion discussion = getDiscussion();
        User user = getUser();

        given(discussionParticipantService.getDiscussionParticipantOffset(anyLong(), anyLong()))
            .willReturn(participantIndex);

        // count : 6 * 11
        PersonalEvent personalEvent = mock(PersonalEvent.class);
        given(personalEvent.getStartTime()).willReturn(LocalDateTime.of(2024, 3, 8, 20, 0, 0));
        given(personalEvent.getEndTime()).willReturn(LocalDateTime.of(2024, 3, 30, 9, 0, 0));
        given(personalEvent.getId()).willReturn(4L);

        // when
        preprocessor.preprocess(List.of(personalEvent), discussion, user);

        // then
        then(discussionBitmapService).should(times(66)).setBitValue(anyLong(), any(LocalDateTime.class), anyLong(), anyBoolean());
    }

    @Test
    @DisplayName("날짜 범위 안에 속하는 경우")
    public void test5() {
        // given
        Long userId = 200L;
        Long participantIndex = 2L;
        // Discussion, User, PersonalEvent 모킹
        Discussion discussion = getDiscussion();
        User user = getUser();

        given(discussionParticipantService.getDiscussionParticipantOffset(anyLong(), anyLong()))
            .willReturn(participantIndex);

        // count : 3 + 6 * 5
        PersonalEvent personalEvent = mock(PersonalEvent.class);
        given(personalEvent.getStartTime()).willReturn(LocalDateTime.of(2024, 3, 12, 13, 50, 0));
        given(personalEvent.getEndTime()).willReturn(LocalDateTime.of(2024, 3, 18, 10, 11, 0));
        given(personalEvent.getId()).willReturn(5L);

        // when
        preprocessor.preprocess(List.of(personalEvent), discussion, user);

        // then
        then(discussionBitmapService).should(times(33)).setBitValue(anyLong(), any(LocalDateTime.class), anyLong(), anyBoolean());
    }

    @Test
    @DisplayName("논의 시간이 23:30 까지 일 경우")
    public void test6() {
        // given
        Long userId = 200L;
        Long participantIndex = 2L;
        // Discussion, User, PersonalEvent 모킹
        // 20:30 ~ 23:30
        Discussion discussion = getAnotherDiscussion();
        User user = getUser();

        given(discussionParticipantService.getDiscussionParticipantOffset(anyLong(), anyLong()))
            .willReturn(participantIndex);

        // count : 1 + 6
        PersonalEvent personalEvent = mock(PersonalEvent.class);
        given(personalEvent.getStartTime()).willReturn(LocalDateTime.of(2024, 3, 15, 23, 0, 0));
        given(personalEvent.getEndTime()).willReturn(LocalDateTime.of(2024, 3, 16, 23, 40, 0));
        given(personalEvent.getId()).willReturn(5L);

        // when
        preprocessor.preprocess(List.of(personalEvent), discussion, user);

        // then
        then(discussionBitmapService).should(times(1 + 6)).setBitValue(anyLong(), any(LocalDateTime.class), anyLong(), anyBoolean());
    }

    @Test
    @DisplayName("논의 시간이 23:30까지 일 때 테스트")
    public void test7() {
        // given
        Long userId = 200L;
        Long participantIndex = 2L;
        // Discussion, User, PersonalEvent 모킹
        // 20:30 ~ 23:30
        Discussion discussion = getAnotherDiscussion();
        User user = getUser();

        given(discussionParticipantService.getDiscussionParticipantOffset(anyLong(), anyLong()))
            .willReturn(participantIndex);

        // count : 5
        PersonalEvent personalEvent = mock(PersonalEvent.class);
        given(personalEvent.getStartTime()).willReturn(LocalDateTime.of(2024, 3, 15, 20, 0, 0));
        given(personalEvent.getEndTime()).willReturn(LocalDateTime.of(2024, 3, 16, 1, 0, 0));
        given(personalEvent.getId()).willReturn(5L);

        // when
        preprocessor.preprocess(List.of(personalEvent), discussion, user);

        // then
        then(discussionBitmapService).should(times(6)).setBitValue(anyLong(), any(LocalDateTime.class), anyLong(), anyBoolean());
    }

    private Discussion getDiscussion() {
        Discussion discussion = Mockito.mock(Discussion.class);
        given(discussion.getId()).willReturn(1L);
        given(discussion.getDiscussionStatus()).willReturn(DiscussionStatus.ONGOING);
        given(discussion.getDateRangeStart()).willReturn(LocalDate.of(2024, 3, 10));
        given(discussion.getDateRangeEnd()).willReturn(LocalDate.of(2024, 3, 20));
        given(discussion.getTimeRangeStart()).willReturn(LocalTime.of(12, 0));
        given(discussion.getTimeRangeEnd()).willReturn(LocalTime.of(15, 0));
        return discussion;
    }

    private Discussion getAnotherDiscussion() {
        Discussion discussion = Mockito.mock(Discussion.class);
        given(discussion.getId()).willReturn(1L);
        given(discussion.getDateRangeStart()).willReturn(LocalDate.of(2024, 3, 10));
        given(discussion.getDateRangeEnd()).willReturn(LocalDate.of(2024, 3, 20));
        given(discussion.getTimeRangeStart()).willReturn(LocalTime.of(20, 30));
        given(discussion.getTimeRangeEnd()).willReturn(LocalTime.of(23, 30));
        return discussion;
    }

    private User getUser() {
        User user = Mockito.mock(User.class);
        given(user.getId()).willReturn(1L);
        return user;
    }
}