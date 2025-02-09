package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.discussion.DiscussionParticipantService;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.redis.DiscussionBitmapService;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersonalEventPreprocessor {

    private final DiscussionBitmapService discussionBitmapService;
    private final DiscussionParticipantService discussionParticipantService;

    public void preprocess(List<PersonalEvent> personalEvents, Discussion discussion, User user) {
        Long index = discussionParticipantService.getDiscussionParticipantIndex(discussion.getId(),
            user.getId());
        for (PersonalEvent personalEvent : personalEvents) {
            convert(personalEvent, discussion.getId(), index);
        }
    }

    private void convert(PersonalEvent personalEvent, Long discussionId, Long offset) {
        LocalDateTime personalEventStartTime = roundDownToNearestHalfHour(personalEvent.getStartTime());
        LocalDateTime personalEventEndTime = roundUpToNearestHalfHour(personalEvent.getEndTime());

        while (personalEventStartTime.isBefore(personalEventEndTime)) {
            // TODO: 에러 처리
            discussionBitmapService.setBitValue(discussionId, personalEventStartTime, offset, true);
            personalEventStartTime = personalEventStartTime.plusMinutes(30);
        }
    }

    private LocalDateTime roundDownToNearestHalfHour(LocalDateTime time) {
        int minute = time.getMinute();
        if (minute < 30) {
            time = time.minusMinutes(minute);
        } else {
            time = time.minusMinutes(minute - 30);
        }
        return time;
    }

    private LocalDateTime roundUpToNearestHalfHour(LocalDateTime time) {
        int minute = time.getMinute();
        if (minute < 30) {
            time = time.plusMinutes(30 - minute);
        } else {
            time = time.plusMinutes(60 - minute);
        }
        return time;
    }
}
