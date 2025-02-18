package endolphin.backend.domain.shared_event;

import endolphin.backend.domain.discussion.DiscussionParticipantService;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.shared_event.dto.SharedEventRequest;
import endolphin.backend.domain.shared_event.dto.SharedEventDto;
import endolphin.backend.domain.shared_event.dto.SharedEventWithDiscussionInfoResponse;
import endolphin.backend.domain.shared_event.entity.SharedEvent;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.dto.ListResponse;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.util.Validator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class SharedEventService {

    private final SharedEventRepository sharedEventRepository;
    private final UserService userService;
    private final DiscussionParticipantService discussionParticipantService;

    public SharedEventDto createSharedEvent(Discussion discussion,
        SharedEventRequest request) {
        Validator.validateDateTimeRange(request.startDateTime(), request.endDateTime());

        SharedEvent sharedEvent = SharedEvent.builder()
            .discussion(discussion)
            .start(request.startDateTime())
            .end(request.endDateTime())
            .build();

        return SharedEventDto.of(sharedEventRepository.save(sharedEvent));
    }

    @Transactional(readOnly = true)
    public SharedEventDto getSharedEvent(Long discussionId) {
        SharedEvent sharedEvent = sharedEventRepository.findByDiscussionId(discussionId)
            .orElseThrow(() -> new ApiException(ErrorCode.SHARED_EVENT_NOT_FOUND));

        return SharedEventDto.of(sharedEvent);
    }

    @Transactional(readOnly = true)
    public Map<Long, SharedEventDto> getSharedEventMap(List<Long> discussionIds) {
        List<SharedEvent> events = sharedEventRepository.findByDiscussionIdIn(discussionIds);

        return events.stream()
            .collect(Collectors.toMap(
                event -> event.getDiscussion().getId(),
                SharedEventDto::of
            ));
    }

    public void deleteSharedEvent(Long sharedEventId) {
        if (!sharedEventRepository.existsById(sharedEventId)) {
            throw new ApiException(ErrorCode.SHARED_EVENT_NOT_FOUND);
        }
        sharedEventRepository.deleteById(sharedEventId);
    }

    @Transactional(readOnly = true)
    public ListResponse<SharedEventWithDiscussionInfoResponse> getUpcomingSharedEvents() {
        User currentUser = userService.getCurrentUser();
        List<Discussion> discussions = discussionParticipantService.getUpcomingDiscussionsByUserId(
            currentUser.getId());

        List<Long> discussionIds = discussions.stream().map(Discussion::getId).toList();

        List<SharedEvent> sharedEvents =
            sharedEventRepository.findByDiscussionIdIn(discussionIds);

        Map<Long, List<String>> discussionParticipantsPicturesMap =
            discussionParticipantService.getDiscussionPicturesMap(discussionIds);

        return new ListResponse<>(sharedEvents.stream().map(se -> {
            Discussion d = se.getDiscussion();

            List<String> pictures = discussionParticipantsPicturesMap.getOrDefault(d.getId(),
                List.of());

            return new SharedEventWithDiscussionInfoResponse(
                d.getId(), d.getTitle(), d.getMeetingMethodOrLocation(), SharedEventDto.of(se),
                pictures
            );
        }).toList());
    }
}
