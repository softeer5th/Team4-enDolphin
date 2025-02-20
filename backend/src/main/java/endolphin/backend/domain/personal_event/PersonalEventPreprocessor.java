package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.discussion.DiscussionParticipantService;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.enums.DiscussionStatus;
import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.redis.DiscussionBitmapService;
import endolphin.backend.global.util.TimeUtil;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
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
        Long offset = discussionParticipantService.getDiscussionParticipantOffset(
            discussion.getId(),
            user.getId());
        for (PersonalEvent personalEvent : personalEvents) {
            if (discussion.getDiscussionStatus() == DiscussionStatus.ONGOING
                && isTimeRangeOverlapping(discussion, personalEvent)) {
                convert(personalEvent, discussion, offset, true);
            }
        }
    }

    public void preprocess(List<PersonalEvent> personalEvents, boolean value) {
        List<Long> userIds = personalEvents.stream().map(PersonalEvent::getUser).map(User::getId)
            .toList();

        Map<Long, Map<Discussion, Long>> userDiscussionOffsetMap =
            discussionParticipantService.getOngoingDiscussionOffsetsByUserIds(userIds);

        for (PersonalEvent personalEvent : personalEvents) {
            Long userId = personalEvent.getUser().getId();
            for (Discussion discussion : userDiscussionOffsetMap.get(userId).keySet()) {
                Long offset = userDiscussionOffsetMap.get(userId).get(discussion);
                if (discussion.getDiscussionStatus() == DiscussionStatus.ONGOING
                    && isTimeRangeOverlapping(discussion, personalEvent)) {
                    convert(personalEvent, discussion, offset, value);
                }
            }
        }
    }

    public void preprocessOne(PersonalEvent personalEvent, Discussion discussion, User user,
        boolean value) {
        Long index = discussionParticipantService.getDiscussionParticipantOffset(discussion.getId(),
            user.getId());
        if (discussion.getDiscussionStatus() == DiscussionStatus.ONGOING
            && isTimeRangeOverlapping(discussion, personalEvent)) {
            convert(personalEvent, discussion, index, value);
        }
    }

    private void convert(PersonalEvent personalEvent, Discussion discussion, Long offset,
        boolean value) {
        Long discussionId = discussion.getId();
        LocalDateTime personalEventStartTime = TimeUtil.roundDownToNearestHalfHour(
            personalEvent.getStartTime());
        LocalDateTime personalEventEndTime = TimeUtil.roundUpToNearestHalfHour(
            personalEvent.getEndTime());

        LocalDate discussionStartDate = discussion.getDateRangeStart();
        LocalDate discussionEndDate = discussion.getDateRangeEnd();
        LocalTime discussionStartTime = discussion.getTimeRangeStart();
        LocalTime discussionEndTime = discussion.getTimeRangeEnd();

        LocalDateTime currentDateTime = getCurrentDateTime(personalEventStartTime,
            discussionStartDate, discussionStartTime, discussionEndTime);

        LocalDateTime untilDateTime = TimeUtil.getUntilDateTime(personalEventEndTime,
            discussionEndDate, discussionEndTime, discussionStartTime);

        log.info("id: {}, currentDateTime: {} untilDateTime: {}", personalEvent.getId(),
            currentDateTime, untilDateTime);

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

    private boolean isTimeRangeOverlapping(
        Discussion discussion, PersonalEvent personalEvent) {
        LocalDate eventStart = personalEvent.getStartTime().toLocalDate();
        LocalDate eventEnd = personalEvent.getEndTime().toLocalDate();
        return !eventStart.isAfter(discussion.getDateRangeEnd())
            && !eventEnd.isBefore(discussion.getDateRangeStart());
    }
}
