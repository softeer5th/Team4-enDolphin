package endolphin.backend.domain.personal_event;

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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PersonalEventPreprocessor {

    private final DiscussionBitmapService discussionBitmapService;
    private final DiscussionParticipantService discussionParticipantService;

    public void preprocess(List<PersonalEvent> personalEvents, Discussion discussion, User user) {
        Long offset = discussionParticipantService.getDiscussionParticipantOffset(discussion.getId(),
            user.getId());
        for (PersonalEvent personalEvent : personalEvents) {
            convert(personalEvent, discussion, offset, true);
            if (discussion.getDiscussionStatus() == DiscussionStatus.ONGOING
                && isTimeRangeOverlapping(discussion, personalEvent)) {
                convert(personalEvent, discussion, index, true);
            }
        }
    }

    public void preprocessOne(PersonalEvent personalEvent, Discussion discussion, User user, boolean value) {
        Long index = discussionParticipantService.getDiscussionParticipantIndex(discussion.getId(),
            user.getId());
        if (discussion.getDiscussionStatus() == DiscussionStatus.ONGOING
            && isTimeRangeOverlapping(discussion, personalEvent)) {
            convert(personalEvent, discussion, index, value);
        }
    }

    private void convert(PersonalEvent personalEvent, Discussion discussion, Long offset,
        boolean value) {
        Long discussionId = discussion.getId();
        LocalDateTime personalEventStartTime = roundDownToNearestHalfHour(
            personalEvent.getStartTime());
        LocalDateTime personalEventEndTime = roundUpToNearestHalfHour(personalEvent.getEndTime());

        LocalDate discussionStartDate = discussion.getDateRangeStart();
        LocalDate discussionEndDate = discussion.getDateRangeEnd();
        LocalTime discussionStartTime = discussion.getTimeRangeStart();
        LocalTime discussionEndTime = discussion.getTimeRangeEnd();

        LocalDateTime currentDateTime = getCurrentDateTime(personalEventStartTime,
            discussionStartDate, discussionStartTime, discussionEndTime);

        LocalDateTime untilDateTime = getUntilDateTime(personalEventEndTime, discussionEndDate,
            discussionEndTime, discussionStartTime);

        log.info("id: {}, currentDateTime: {} untilDateTime: {}", personalEvent.getId(), currentDateTime, untilDateTime);

        while (!currentDateTime.toLocalDate().isAfter(untilDateTime.toLocalDate())) {
            while (currentDateTime.toLocalTime().isBefore(discussionEndTime)
            && currentDateTime.isBefore(untilDateTime)) {
                discussionBitmapService.setBitValue(discussionId, currentDateTime, offset, value);
                currentDateTime = currentDateTime.plusMinutes(30);
            }
            currentDateTime = currentDateTime.plusDays(1);
            currentDateTime = currentDateTime.toLocalDate().atTime(discussionStartTime);
        }
    }

    private LocalDateTime getCurrentDateTime(LocalDateTime personalEventStartTime,
        LocalDate discussionStartDate, LocalTime discussionStartTime, LocalTime discussionEndTime) {

        LocalDate currentDate = personalEventStartTime.toLocalDate();
        if (currentDate.isBefore(discussionStartDate)) {
            return discussionStartDate.atTime(discussionStartTime);
        }

        LocalTime currentTime = personalEventStartTime.toLocalTime();
        if (currentTime.isBefore(discussionStartTime)) {
            currentTime = discussionStartTime;
        } else if (currentTime.isAfter(discussionEndTime)) {
            currentTime = discussionStartTime;
            currentDate = currentDate.plusDays(1);
        }

        return currentDate.atTime(currentTime);
    }

    private LocalDateTime getUntilDateTime(LocalDateTime personalEventEndTime,
        LocalDate discussionEndDate, LocalTime discussionEndTime, LocalTime discussionStartTime) {
        LocalDate untilDate = personalEventEndTime.toLocalDate();
        if (untilDate.isAfter(discussionEndDate)) {
            return discussionEndDate.atTime(discussionEndTime);
        }

        LocalTime untilTime = personalEventEndTime.toLocalTime();
        if (untilTime.isAfter(discussionEndTime)) {
            untilTime = discussionEndTime;
        } else if (untilTime.isBefore(discussionStartTime)) {
            untilTime = discussionEndTime;
            untilDate = untilDate.minusDays(1);
        }

        return untilDate.atTime(untilTime);
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
        if (minute == 0) {
            time = time.plusMinutes(minute);
        }
        else if (minute < 30) {
            time = time.plusMinutes(30 - minute);
        } else {
            time = time.plusMinutes(60 - minute);
        }
        return time;
    }

    private boolean isTimeRangeOverlapping(
        Discussion discussion, PersonalEvent personalEvent) {
        LocalDate eventStart = personalEvent.getStartTime().toLocalDate();
        LocalDate eventEnd = personalEvent.getEndTime().toLocalDate();
        return !eventStart.isAfter(discussion.getDateRangeEnd())
            && !eventEnd.isBefore(discussion.getDateRangeStart());
    }
}
