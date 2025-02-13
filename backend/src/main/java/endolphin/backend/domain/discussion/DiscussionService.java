package endolphin.backend.domain.discussion;

import endolphin.backend.domain.discussion.dto.CandidateEventDetailsRequest;
import endolphin.backend.domain.discussion.dto.CandidateEventDetailsResponse;
import endolphin.backend.domain.discussion.dto.CreateDiscussionRequest;
import endolphin.backend.domain.discussion.dto.DiscussionResponse;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.enums.DiscussionStatus;
import endolphin.backend.domain.personal_event.PersonalEventService;
import endolphin.backend.domain.personal_event.dto.PersonalEventWithStatus;
import endolphin.backend.domain.shared_event.SharedEventService;
import endolphin.backend.domain.shared_event.dto.SharedEventRequest;
import endolphin.backend.domain.shared_event.dto.SharedEventWithDiscussionInfoResponse;
import endolphin.backend.domain.shared_event.dto.SharedEventDto;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.dto.UserInfoWithPersonalEvents;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.redis.DiscussionBitmapService;
import endolphin.backend.global.security.PasswordEncoder;
import endolphin.backend.global.util.Validator;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class DiscussionService {

    private final DiscussionRepository discussionRepository;
    private final UserService userService;
    private final PersonalEventService personalEventService;
    private final SharedEventService sharedEventService;
    private final DiscussionParticipantService discussionParticipantService;
    private final DiscussionBitmapService discussionBitmapService;
    private final PasswordEncoder passwordEncoder;

    public DiscussionResponse createDiscussion(CreateDiscussionRequest request) {
        User currentUser = userService.getCurrentUser();

        Discussion discussion = Discussion.builder()
            .title(request.title())
            .dateStart(request.dateRangeStart())
            .dateEnd(request.dateRangeEnd())
            .timeStart(request.timeRangeStart())
            .timeEnd(request.timeRangeEnd())
            .duration(request.duration())
            .deadline(request.deadline())
            .meetingMethod(request.meetingMethod())
            .location(request.location())
            .build();

        discussion = discussionRepository.save(discussion);

        if (request.password() != null) {
            discussion.setPassword(passwordEncoder.encode(discussion.getId(), request.password()));
            discussion = discussionRepository.save(discussion);
        }

        discussionParticipantService.addDiscussionParticipant(discussion, currentUser);
        personalEventService.preprocessPersonalEvents(currentUser, discussion);

        return new DiscussionResponse(
            discussion.getId(),
            discussion.getTitle(),
            discussion.getDateRangeStart(),
            discussion.getDateRangeEnd(),
            discussion.getMeetingMethod(),
            discussion.getLocation(),
            discussion.getDuration(),
            calculateTimeLeft(discussion.getDeadline())
        );
    }

    public SharedEventWithDiscussionInfoResponse confirmSchedule(Long discussionId,
        SharedEventRequest request) {
        Discussion discussion = discussionRepository.findById(discussionId)
            .orElseThrow(() -> new ApiException(ErrorCode.DISCUSSION_NOT_FOUND));

        if(discussion.getDiscussionStatus() != DiscussionStatus.ONGOING) {
            throw new ApiException(ErrorCode.DISCUSSION_NOT_ONGOING);
        }

        SharedEventDto sharedEventDto = sharedEventService.createSharedEvent(discussion,
            request);

        List<User> participants = discussionParticipantService.getUsersByDiscussionId(discussionId);

        List<String> participantPictures = participants.stream().map(User::getPicture)
            .toList();

        personalEventService.createPersonalEventsForParticipants(participants, discussion,
            sharedEventDto);

        discussion.setDiscussionStatus(DiscussionStatus.UPCOMING);

        discussionRepository.save(discussion);

        discussionBitmapService.deleteDiscussionBitmapsUsingScan(discussionId)
            .thenRun(() -> log.info("Redis keys deleted successfully for discussionId : {}",
                discussionId))
            .exceptionally(ex -> {
                log.error("Failed to delete Redis keys for three times", ex);
                return null;
            });

        return new SharedEventWithDiscussionInfoResponse(
            discussionId,
            discussion.getTitle(),
            discussion.getMeetingMethodOrLocation(),
            sharedEventDto,
            participantPictures
        );
    }

    @Transactional(readOnly = true)
    public CandidateEventDetailsResponse retrieveCandidateEventDetails(
        Long discussionId, CandidateEventDetailsRequest request) {
        final int TIME_OFFSET = 4;

        LocalDateTime startTime = request.startDateTime();
        LocalDateTime endTime = request.endDateTime();

        Validator.validateDateTimeRange(startTime, endTime);

        LocalDateTime midTime = calculateMidTime(startTime, endTime);

        LocalDateTime searchStartTime = midTime.minusHours(TIME_OFFSET);
        LocalDateTime searchEndTime = midTime.plusHours(TIME_OFFSET);

        User currentUser = userService.getCurrentUser();
        List<User> participants = discussionParticipantService.getUsersByDiscussionIdOrderByCreatedAt(
            discussionId);

        if (!participants.contains(currentUser)) {
            throw new ApiException(ErrorCode.DISCUSSION_PARTICIPANT_NOT_FOUND);
        }

        Map<Long, Integer> selectedUserIdMap = new HashMap<>();
        for (int i = 0; i < request.selectedUserIdList().size(); i++) {
            selectedUserIdMap.put(request.selectedUserIdList().get(i), i);
        }

        Map<Long, List<PersonalEventWithStatus>> result0 =
            personalEventService.findPersonalEventStatusesByUsers(
                participants, searchStartTime, searchEndTime, startTime, endTime);

        List<UserInfoWithPersonalEvents> currentUserList = new ArrayList<>();
        List<UserInfoWithPersonalEvents> selectedUsersList = new ArrayList<>();
        List<UserInfoWithPersonalEvents> othersList = new ArrayList<>();

        for (User user : participants) {
            UserInfoWithPersonalEvents userinfo =
                new UserInfoWithPersonalEvents(user.getId(), user.getName(), user.getPicture(),
                    selectedUserIdMap.containsKey(user.getId()), result0.get(user.getId()));
            if (user.getId().equals(currentUser.getId())) {
                currentUserList.add(userinfo);
            } else if (selectedUserIdMap.containsKey(user.getId())) {
                selectedUsersList.add(userinfo);
            } else {
                othersList.add(userinfo);
            }
        }

        selectedUsersList.sort(Comparator.comparingInt(info ->
            selectedUserIdMap.get(info.id())
        ));

        List<UserInfoWithPersonalEvents> sortedResult = new ArrayList<>();
        sortedResult.addAll(currentUserList);
        sortedResult.addAll(selectedUsersList);
        sortedResult.addAll(othersList);

        return new CandidateEventDetailsResponse(discussionId, startTime, endTime,
            sortedResult);
    }

    private long calculateTimeLeft(LocalDate deadline) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime deadlineDateTime = deadline.atTime(23, 59, 59);
        Duration duration = Duration.between(now, deadlineDateTime);

        return duration.toMillis();
    }

    @Transactional(readOnly = true)
    public Discussion getDiscussionById(Long discussionId) {
        return discussionRepository.findById(discussionId)
            .orElseThrow(() -> new ApiException(ErrorCode.DISCUSSION_NOT_FOUND));
    }

    private LocalDateTime calculateMidTime(LocalDateTime startTime, LocalDateTime endTime) {
        Duration duration = Duration.between(startTime, endTime);
        duration = duration.dividedBy(2);

        return startTime.plus(duration);
    }
}
