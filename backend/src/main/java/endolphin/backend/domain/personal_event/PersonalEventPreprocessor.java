package endolphin.backend.domain.personal_event;

import static endolphin.backend.global.util.TimeUtil.convertToMinute;
import static endolphin.backend.global.util.TimeUtil.getCurrentDateTime;
import static endolphin.backend.global.util.TimeUtil.getUntilDateTime;

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
    private final PersonalEventRepository personalEventRepository;

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
        long MINUTE_PER_DAY = 1440;
        log.info("Convert personal eventId: {} to discussionId: {}", personalEvent.getId(), discussion.getId());
        Long discussionId = discussion.getId();
        Long userId = personalEvent.getUser().getId();

        LocalDate discussionStartDate = discussion.getDateRangeStart();
        LocalDate discussionEndDate = discussion.getDateRangeEnd();
        LocalTime discussionStartTime = discussion.getTimeRangeStart();
        LocalTime discussionEndTime = discussion.getTimeRangeEnd();

        long currentDateTime = getCurrentDateTime(personalEvent.getStartTime(),
            discussionStartDate, discussionStartTime);

        long untilDateTime = getUntilDateTime(personalEvent.getEndTime(),
            discussionEndDate, discussionEndTime);

        long currentDate = currentDateTime / MINUTE_PER_DAY;
        long minTime = convertToMinute(discussionStartTime);
        long maxTime = convertToMinute(discussionEndTime);

        log.info("id: {}, currentDateTime: {} untilDateTime: {}", personalEvent.getId(),
            currentDateTime, untilDateTime);

        while (currentDateTime < untilDateTime) {
            while (currentDateTime % MINUTE_PER_DAY < maxTime && currentDateTime < untilDateTime) {
                LocalDateTime start = TimeUtil.convertToLocalDateTime(currentDateTime);
                LocalDateTime end = start.plusMinutes(30L);
                if (value || !isDuplicateEvents(start, end, userId)) {
                    discussionBitmapService.setBitValue(discussionId, currentDateTime, offset, value);
                }
                currentDateTime += 30;
            }
            currentDateTime = ++currentDate * MINUTE_PER_DAY + minTime;
        }
    }

    private boolean isTimeRangeOverlapping(
        Discussion discussion, PersonalEvent personalEvent) {
        LocalDate eventStart = personalEvent.getStartTime().toLocalDate();
        LocalDate eventEnd = personalEvent.getEndTime().toLocalDate();
        return !eventStart.isAfter(discussion.getDateRangeEnd())
            && !eventEnd.isBefore(discussion.getDateRangeStart());
    }

    private boolean isDuplicateEvents(LocalDateTime start, LocalDateTime end, Long userId) {
        return personalEventRepository.countByUserIdAndDateTimeRange(
            userId, start, end) > 1;
    }
}
