package endolphin.backend.domain.personal_event;

import static endolphin.backend.global.util.TimeUtil.convertToMinute;
import static endolphin.backend.global.util.TimeUtil.getSearchingStartTime;
import static endolphin.backend.global.util.TimeUtil.getSearchingEndTime;
import static endolphin.backend.global.util.TimeUtil.roundDownToNearestHalfHour;

import endolphin.backend.domain.discussion.DiscussionParticipantService;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.enums.DiscussionStatus;
import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.redis.DiscussionBitmapService;
import endolphin.backend.global.util.TimeUtil;
import java.time.LocalDate;
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
        log.info("Convert personal eventId: {} to discussionId: {}", personalEvent.getId(),
            discussion.getId());
        Long discussionId = discussion.getId();
        Long userId = personalEvent.getUser().getId();

        LocalTime discussionStartTime = discussion.getTimeRangeStart();
        LocalTime discussionEndTime = discussion.getTimeRangeEnd();

        long searchingNow = getSearchingStartTime(
            roundDownToNearestHalfHour(personalEvent.getStartTime()),
            discussion.getDateRangeStart(), discussionStartTime);

        long searchingEnd = getSearchingEndTime(personalEvent.getEndTime(),
            discussion.getDateRangeEnd(), discussionEndTime);

        long searchingDay = searchingNow / MINUTE_PER_DAY;
        long minTime = convertToMinute(discussionStartTime);
        long maxTime = convertToMinute(discussionEndTime);

        log.info("id: {}, searching now: {} searching end: {}", personalEvent.getId(),
            searchingNow, searchingEnd);

        while (searchingNow < searchingEnd) {
            while (searchingNow % MINUTE_PER_DAY < maxTime && searchingNow < searchingEnd) {
                if (value || !isDuplicateEvents(searchingNow, searchingNow + 30, userId)) {
                    discussionBitmapService.setBitValue(discussionId, searchingNow, offset,
                        value);
                }
                searchingNow += 30;
            }
            searchingNow = ++searchingDay * MINUTE_PER_DAY + minTime;
        }
    }

    private boolean isTimeRangeOverlapping(
        Discussion discussion, PersonalEvent personalEvent) {
        LocalDate eventStart = personalEvent.getStartTime().toLocalDate();
        LocalDate eventEnd = personalEvent.getEndTime().toLocalDate();
        return !eventStart.isAfter(discussion.getDateRangeEnd())
            && !eventEnd.isBefore(discussion.getDateRangeStart());
    }

    private boolean isDuplicateEvents(long start, long end, Long userId) {
        return personalEventRepository.countByUserIdAndDateTimeRange(
            userId,
            TimeUtil.convertToLocalDateTime(start),
            TimeUtil.convertToLocalDateTime(end)) > 1;
    }
}
