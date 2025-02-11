package endolphin.backend.domain.candidate_event;

import endolphin.backend.domain.candidate_event.dto.CandidateEvent;
import endolphin.backend.domain.candidate_event.dto.CalendarViewRequest;
import endolphin.backend.domain.discussion.DiscussionParticipantService;
import endolphin.backend.domain.discussion.DiscussionService;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.global.redis.DiscussionBitmapService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CandidateEventService {

    private final DiscussionBitmapService discussionBitmapService;
    private final DiscussionService discussionService;
    private final DiscussionParticipantService discussionParticipantService;

    public List<CandidateEvent> getEventsOnCalendarView(Long discussionId,
        CalendarViewRequest request) {

        Discussion discussion = discussionService.getDiscussionById(discussionId);

        int filter = discussionParticipantService.getFilter(discussionId, request.selectedUserIdList());

        List<CandidateEvent> events = searchCandidateEvents(discussion, filter);

        int returnSize = (request.size() != null) ? request.size() : getReturnSize(discussion);

        events = sortCandidateEvents(events, returnSize);

        if (request.startDate() != null && request.endDate() != null) {
            return events.stream()
                .filter(event ->
                    event.startDateTime() >= convertToMinute(request.startDate().atStartOfDay())
                        && event.endDateTime() <= convertToMinute(
                        request.endDate().plusDays(1).atStartOfDay()))
                .collect(Collectors.toList());
        }

        return events;
    }

    public List<CandidateEvent> searchCandidateEvents(Discussion discussion, int filter) {
        long startDateTime = convertToMinute(discussion.getDateRangeStart()
            .atTime(discussion.getTimeRangeStart()));

        long endDateTime = convertToMinute(discussion.getDateRangeEnd()
            .atTime(discussion.getTimeRangeEnd()));

        long now = convertToMinute(LocalDateTime.now());

        long minuteKey = startDateTime;

        int duration = discussion.getDuration();

        if (now > endDateTime) {
            return null;
        }

        if (now < startDateTime) {
            minuteKey = now;
        }

        long maxTime = endDateTime % 1440 - duration;

        Map<Long, byte[]> dataBlocks = discussionBitmapService.getDataOfDiscussionId(
            discussion.getId(), startDateTime, endDateTime);
        long day = 0;

        List<CandidateEvent> events = new ArrayList<>();

        while (minuteKey < endDateTime) {

            if (minuteKey % 1440 >= maxTime) {
                minuteKey = ++day * 1440 + startDateTime;
                continue;
            }

            if (!dataBlocks.containsKey(minuteKey)) {
                minuteKey += 30;
                continue;
            }

            int data = toInt(dataBlocks.get(minuteKey)) & filter;
            int totalTime = Integer.bitCount(data);
            long nextMinuteKey = minuteKey + 30;
            long endKey = minuteKey + duration;

            for (long i = nextMinuteKey; i < endKey + duration; i += 30) {
                if (dataBlocks.containsKey(i)) {
                    int nextData = toInt(dataBlocks.get(i)) & filter;
                    data &= nextData;
                    totalTime += Integer.bitCount(nextData);
                } else {
                    nextMinuteKey += 30;
                }
            }

            events.add(
                new CandidateEvent(minuteKey, endKey, Integer.bitCount(data), totalTime, data));
            minuteKey = nextMinuteKey;
        }

        return events.isEmpty() ? null : events;
    }

    public List<CandidateEvent> sortCandidateEvents(List<CandidateEvent> candidateEvents,
        int size) {

        return candidateEvents.stream()
            .sorted(Comparator
                .comparingInt(CandidateEvent::userCount)
                .thenComparingInt(CandidateEvent::totalTimeToAdjust)
                .thenComparingLong(CandidateEvent::startDateTime))
            .limit(size)
            .collect(Collectors.toList());
    }


    private int getReturnSize(Discussion discussion) {
        LocalDate startDate = discussion.getDateRangeStart();
        if (LocalDate.now().isAfter(startDate)) {
            startDate = LocalDate.now();
        }

        long between = ChronoUnit.DAYS.between(startDate, discussion.getDateRangeEnd()) + 1;

        if (between < 1) {
            return 0;
        } else if (between < 3) {
            return 6;
        } else if (between < 15) {
            return 2 * (int) between;
        }

        return 30;
    }

    private int toInt(byte[] data) {
        return ((data[0] & 0xFF) << 8) | (data[1] & 0xFF);
    }

    private Long convertToMinute(LocalDateTime dateTime) {
        return dateTime.toEpochSecond(ZoneOffset.ofHours(9)) / 60;
    }
}
