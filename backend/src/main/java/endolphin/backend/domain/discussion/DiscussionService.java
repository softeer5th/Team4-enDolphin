package endolphin.backend.domain.discussion;

import endolphin.backend.domain.discussion.dto.CreateDiscussionRequest;
import endolphin.backend.domain.discussion.dto.DiscussionResponse;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.personal_event.PersonalEventService;
import endolphin.backend.domain.shared_event.SharedEventService;
import endolphin.backend.domain.shared_event.dto.SharedEventRequest;
import endolphin.backend.domain.shared_event.dto.SharedEventWithDiscussionInfoResponse;
import endolphin.backend.domain.shared_event.dto.SharedEventDto;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.redis.DiscussionBitmapService;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
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

        SharedEventDto sharedEventDto = sharedEventService.createSharedEvent(discussion,
            request);

        List<User> participants = discussionParticipantService.getUsersByDiscussionId(discussionId);

        List<String> participantPictures = participants.stream().map(User::getPicture)
            .toList();

        personalEventService.createPersonalEventsForParticipants(participants, discussion,
            sharedEventDto);

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
}
