package endolphin.backend.domain.candidate_event;

import endolphin.backend.domain.candidate_event.dto.CalendarViewResponse;
import endolphin.backend.domain.candidate_event.dto.CandidateEvent;
import endolphin.backend.domain.candidate_event.dto.CalendarViewRequest;
import endolphin.backend.domain.candidate_event.dto.CandidateEventResponse;
import endolphin.backend.domain.candidate_event.dto.RankViewRequest;
import endolphin.backend.domain.candidate_event.dto.RankViewResponse;
import endolphin.backend.domain.discussion.DiscussionParticipantService;
import endolphin.backend.domain.discussion.DiscussionService;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.global.redis.DiscussionBitmapService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
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
    private final static long MINUTE_PER_DAY = 1440;

    public CalendarViewResponse getEventsOnCalendarView(Long discussionId,
        CalendarViewRequest request) {
        discussionParticipantService.validateDiscussionParticipant(discussionId);

        Discussion discussion = discussionService.getDiscussionById(discussionId);

        int filter = discussionParticipantService.getFilter(discussionId,
            request.selectedUserIdList());

        if(filter == 0) {
            return new CalendarViewResponse(Collections.emptyList());
        }

        List<CandidateEvent> events = searchCandidateEvents(discussion, filter);

        int returnSize = (request.size() != null) ? request.size() : getReturnSize(discussion);

        events = sortCandidateEvents(events, returnSize);

        if (request.startDate() != null && request.endDate() != null) {
            events = events.stream()
                .filter(event ->
                    event.startDateTime() >= convertToMinute(request.startDate().atStartOfDay())
                        && event.endDateTime() <= convertToMinute(
                        request.endDate().plusDays(1).atStartOfDay()))
                .collect(Collectors.toList());
        }

        return convertToResponse(discussionId, events);
    }

    public RankViewResponse getEventsOnRankView(Long discussionId, RankViewRequest request) {
        discussionParticipantService.validateDiscussionParticipant(discussionId);
        Discussion discussion = discussionService.getDiscussionById(discussionId);

        int filter = discussionParticipantService.getFilter(discussionId,
            request.selectedUserIdList());

        if(filter == 0) {
            return new RankViewResponse(Collections.emptyList(), Collections.emptyList());
        }

        List<CandidateEvent> events = searchCandidateEvents(discussion, filter);

        events = sortCandidateEvents(events, getReturnSize(discussion));

        List<CandidateEventResponse> eventsRankedDefault = convertToResponse(discussionId, events)
            .events();

        List<CandidateEventResponse> eventsRankedOfTime = eventsRankedDefault.stream()
            .sorted(Comparator.comparing(CandidateEventResponse::startDateTime))
            .toList();

        return new RankViewResponse(eventsRankedDefault, eventsRankedOfTime);
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
            return Collections.emptyList();
        }

        if (now >= startDateTime) {
            minuteKey = convertToMinute(LocalDate.now().atTime(discussion.getTimeRangeStart()));
        }

        long maxTime = endDateTime % MINUTE_PER_DAY - duration;

        Map<Long, byte[]> dataBlocks = discussionBitmapService.getDataOfDiscussionId(
            discussion.getId(), minuteKey, endDateTime);
        long day = 0;

        List<CandidateEvent> events = new ArrayList<>();

        while (minuteKey < endDateTime) {
            if (minuteKey % MINUTE_PER_DAY > maxTime) {
                minuteKey = ++day * MINUTE_PER_DAY + startDateTime;
                continue;
            }

            int data;
            int totalTime;

            if (!dataBlocks.containsKey(minuteKey)) {
                data = 0;
                totalTime = 0;
            } else {
                data = toInt(dataBlocks.get(minuteKey)) & filter;
                totalTime = Integer.bitCount(data);
            }

            long nextMinuteKey = minuteKey + 30;
            long endKey = minuteKey + duration;

            for (long i = nextMinuteKey; i < endKey; i += 30) {
                if (dataBlocks.containsKey(i)) {
                    int nextData = toInt(dataBlocks.get(i)) & filter;
                    data |= nextData;
                    totalTime += Integer.bitCount(nextData);
                }
            }

            events.add(
                new CandidateEvent(minuteKey, endKey, Integer.bitCount(data), totalTime, data));

            minuteKey = nextMinuteKey;
        }

        return events;
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
        return dateTime.toEpochSecond(ZoneOffset.UTC) / 60;
    }

    private CalendarViewResponse convertToResponse(Long discussionId, List<CandidateEvent> events) {
        List<CandidateEventResponse> responses = events.stream()
            .map(event -> new CandidateEventResponse(
                convertToLocalDateTime(event.startDateTime()),
                convertToLocalDateTime(event.endDateTime()),
                discussionParticipantService.getUsersFromData(discussionId, event.usersData())
            ))
            .collect(Collectors.toList());
        return new CalendarViewResponse(responses);
    }

    private LocalDateTime convertToLocalDateTime(long minuteKey) {
        long epochSeconds = minuteKey * 60;
        return LocalDateTime.ofEpochSecond(epochSeconds, 0, ZoneOffset.UTC);
    }
}
