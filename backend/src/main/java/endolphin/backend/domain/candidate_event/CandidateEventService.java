package endolphin.backend.domain.candidate_event;

import static endolphin.backend.global.util.TimeUtil.MINUTE_PER_DAY;
import static endolphin.backend.global.util.TimeUtil.convertToLocalDateTime;
import static endolphin.backend.global.util.TimeUtil.convertToMinute;
import static endolphin.backend.global.util.TimeUtil.getNow;
import static endolphin.backend.global.util.TimeUtil.getSearchingStartTime;
import static endolphin.backend.global.util.TimeUtil.roundUpToNearestHalfHour;

import endolphin.backend.domain.candidate_event.dto.CalendarViewResponse;
import endolphin.backend.domain.candidate_event.dto.CandidateEvent;
import endolphin.backend.domain.candidate_event.dto.CalendarViewRequest;
import endolphin.backend.domain.candidate_event.dto.CandidateEventResponse;
import endolphin.backend.domain.candidate_event.dto.RankViewRequest;
import endolphin.backend.domain.candidate_event.dto.RankViewResponse;
import endolphin.backend.domain.discussion.DiscussionParticipantService;
import endolphin.backend.domain.discussion.DiscussionService;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.enums.DiscussionStatus;
import endolphin.backend.domain.user.dto.UserIdNameDto;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.redis.DiscussionBitmapService;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "searchingSpeed")
public class CandidateEventService {

    private final DiscussionBitmapService discussionBitmapService;
    private final DiscussionService discussionService;
    private final DiscussionParticipantService discussionParticipantService;

    public CalendarViewResponse getEventsOnCalendarView(Long discussionId,
        CalendarViewRequest request) {
        discussionParticipantService.validateDiscussionParticipant(discussionId);

        Discussion discussion = discussionService.getDiscussionById(discussionId);

        if (discussion.getDiscussionStatus() != DiscussionStatus.ONGOING) {
            throw new ApiException(ErrorCode.DISCUSSION_NOT_ONGOING);
        }

        Map<Long, UserIdNameDto> usersMap = discussionParticipantService.getUserOffsetsMap(
            discussionId);

        int filter = discussionParticipantService.getFilter(request.selectedUserIdList(),
            usersMap);

        if (filter == 0) {
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

        return convertToResponse(events, usersMap);
    }

    public RankViewResponse getEventsOnRankView(Long discussionId, RankViewRequest request) {
        discussionParticipantService.validateDiscussionParticipant(discussionId);
        Discussion discussion = discussionService.getDiscussionById(discussionId);

        if (discussion.getDiscussionStatus() != DiscussionStatus.ONGOING) {
            throw new ApiException(ErrorCode.DISCUSSION_NOT_ONGOING);
        }

        Map<Long, UserIdNameDto> usersMap = discussionParticipantService.getUserOffsetsMap(
            discussionId);

        int filter = discussionParticipantService.getFilter(request.selectedUserIdList(),
            usersMap);

        if (filter == 0) {
            return new RankViewResponse(Collections.emptyList(), Collections.emptyList());
        }

        List<CandidateEvent> events = searchCandidateEvents(discussion, filter);

        events = sortCandidateEvents(events, getReturnSize(discussion));

        List<CandidateEventResponse> eventsRankedDefault = convertToResponse(events, usersMap)
            .events();

        List<CandidateEventResponse> eventsRankedOfTime = eventsRankedDefault.stream()
            .sorted(Comparator.comparing(CandidateEventResponse::startDateTime))
            .toList();

        return new RankViewResponse(eventsRankedDefault, eventsRankedOfTime);
    }

    public List<CandidateEvent> searchCandidateEvents(Discussion discussion, int filter) {
        LocalDateTime now = getNow();
        long searchingNow = getSearchingStartTime(
            roundUpToNearestHalfHour(now),
            discussion.getDateRangeStart(), discussion.getTimeRangeStart());

        long endDateTime = convertToMinute(discussion.getDateRangeEnd()
            .atTime(discussion.getTimeRangeEnd()));

        int duration = discussion.getDuration();

        if (searchingNow >= endDateTime) {
            return Collections.emptyList();
        }

        Map<Long, byte[]> dataBlocks = discussionBitmapService.getDataOfDiscussionId(
            discussion.getId());

        long searchingDay = searchingNow / MINUTE_PER_DAY;
        long maxTime = endDateTime % MINUTE_PER_DAY - duration;
        long minTime = convertToMinute(discussion.getTimeRangeStart());

        List<CandidateEvent> events = new ArrayList<>();

        while (searchingNow < endDateTime) {
            if (searchingNow % MINUTE_PER_DAY > maxTime) {
                searchingNow = ++searchingDay * MINUTE_PER_DAY + minTime;
                continue;
            }

            int data = 0;
            int totalTime = 0;

            long end = searchingNow + duration;

            for (long i = searchingNow; i < end; i += 30) {
                if (dataBlocks.containsKey(i)) {
                    int nextData = toInt(dataBlocks.get(i)) & filter;
                    data |= nextData;
                    totalTime += Integer.bitCount(nextData);
                }
            }
            events.add(
                new CandidateEvent(searchingNow, end, Integer.bitCount(data), totalTime, data));

            searchingNow += 30;
        }

        Duration d = Duration.between(now, getNow());

        log.info("searching speed: {} ms", d.toMillis());

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

    private CalendarViewResponse convertToResponse(List<CandidateEvent> events,
        Map<Long, UserIdNameDto> usersMap) {
        List<CandidateEventResponse> responses = events.stream()
            .map(event -> new CandidateEventResponse(
                convertToLocalDateTime(event.startDateTime()),
                convertToLocalDateTime(event.endDateTime()),
                discussionParticipantService.getUsersFromData(event.usersData(), usersMap)
            ))
            .collect(Collectors.toList());
        return new CalendarViewResponse(responses);
    }
}
