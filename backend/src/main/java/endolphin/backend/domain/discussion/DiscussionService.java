package endolphin.backend.domain.discussion;

import endolphin.backend.domain.discussion.dto.CreateDiscussionRequest;
import endolphin.backend.domain.discussion.dto.DiscussionResponse;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.entity.DiscussionParticipant;
import endolphin.backend.domain.shared_event.SharedEventService;
import endolphin.backend.domain.shared_event.dto.SharedEventRequest;
import endolphin.backend.domain.shared_event.dto.SharedEventWithDiscussionInfoResponse;
import endolphin.backend.domain.shared_event.dto.SharedEventResponse;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.dto.UserProfile;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class DiscussionService {

    private final DiscussionRepository discussionRepository;
    private final DiscussionParticipantRepository discussionParticipantRepository;
    private final UserService userService;
    private final SharedEventService sharedEventService;

    public DiscussionResponse createDiscussion(CreateDiscussionRequest request) {

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

        discussionRepository.save(discussion);

        User currentUser = userService.getCurrentUser();
        DiscussionParticipant participant = DiscussionParticipant.builder()
            .discussion(discussion)
            .user(currentUser)
            .isHost(true)
            .build();
        discussionParticipantRepository.save(participant);

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

        SharedEventResponse sharedEventResponse = sharedEventService.createSharedEvent(discussion,
            request);

        List<UserProfile> participants = discussionParticipantRepository.findUserProfilesByDiscussionId(
            discussionId);

        List<Long> participantIds = participants.stream().map(UserProfile::id)
            .toList();

        List<String> participantPictures = participants.stream().map(UserProfile::pictureUrl)
            .toList();

        //TODO: 모든 참여자의 개인 일정에 확정 일정 추가
        //TODO: Redis 데이터 삭제

        return new SharedEventWithDiscussionInfoResponse(
            discussionId,
            discussion.getTitle(),
            discussion.getMeetingMethodOrLocation(),
            sharedEventResponse,
            participantPictures
        );
    }

    private long calculateTimeLeft(LocalDate deadline) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime deadlineDateTime = deadline.atTime(23, 59, 59);
        Duration duration = Duration.between(now, deadlineDateTime);

        return duration.toMillis();
    }
}
