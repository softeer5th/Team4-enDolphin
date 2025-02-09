package endolphin.backend.domain.personal_event;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import endolphin.backend.domain.discussion.DiscussionService;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.redis.DiscussionBitmapService;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class PersonalEventPreprocessorTest {

    @Mock
    private DiscussionBitmapService discussionBitmapService;
    @Mock
    private DiscussionService discussionService;
    @InjectMocks
    private PersonalEventPreprocessor preprocessor;

    @Test
    @DisplayName("preprocess 메소드: PersonalEvent의 시간 변환 후 setBitValue 호출 검증")
    void testPreprocessCallsSetBitValueWithCorrectTimes() {
        // given
        Long discussionId = 100L;
        Long userId = 200L;
        Long participantIndex = 3L;

        // Discussion, User, PersonalEvent 모킹
        Discussion discussion = mock(Discussion.class);
        given(discussion.getId()).willReturn(discussionId);

        User user = mock(User.class);
        given(user.getId()).willReturn(userId);

        given(discussionService.getDiscussionParticipantIndex(discussionId, userId))
            .willReturn(participantIndex);

        // PersonalEvent: 시작 10:15, 종료 11:15
        PersonalEvent personalEvent = mock(PersonalEvent.class);
        LocalDateTime startTime = LocalDateTime.of(2025, 2, 9, 10, 15);
        LocalDateTime endTime = LocalDateTime.of(2025, 2, 9, 11, 15);
        given(personalEvent.getStartTime()).willReturn(startTime);
        given(personalEvent.getEndTime()).willReturn(endTime);

        // when
        preprocessor.preprocess(List.of(personalEvent), discussion, user);

        // then: 예상 호출 시간은 10:00, 10:30, 11:00 (11:30은 조건 미충족)
        LocalDateTime expectedTime1 = LocalDateTime.of(2025, 2, 9, 10, 0);
        LocalDateTime expectedTime2 = LocalDateTime.of(2025, 2, 9, 10, 30);
        LocalDateTime expectedTime3 = LocalDateTime.of(2025, 2, 9, 11, 0);

        then(discussionBitmapService).should().setBitValue(discussionId, expectedTime1, participantIndex, true);
        then(discussionBitmapService).should().setBitValue(discussionId, expectedTime2, participantIndex, true);
        then(discussionBitmapService).should().setBitValue(discussionId, expectedTime3, participantIndex, true);
        then(discussionBitmapService).shouldHaveNoMoreInteractions();
    }
}