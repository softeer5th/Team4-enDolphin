package endolphin.backend.domain.shared_event;

import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.shared_event.dto.SharedEventRequest;
import endolphin.backend.domain.shared_event.dto.SharedEventResponse;
import endolphin.backend.domain.shared_event.entity.SharedEvent;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.util.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class SharedEventService {

    private final SharedEventRepository sharedEventRepository;

    public SharedEventResponse createSharedEvent(Discussion discussion,
        SharedEventRequest request) {
        Validator.validateDateTimeRange(request.startTime(), request.endTime());

        SharedEvent sharedEvent = SharedEvent.builder()
            .discussion(discussion)
            .start(request.startTime())
            .end(request.endTime())
            .build();

        return SharedEventResponse.of(sharedEventRepository.save(sharedEvent));
    }

    public SharedEventResponse getSharedEvent(Long sharedEventId) {
        SharedEvent sharedEvent = sharedEventRepository.findById(sharedEventId)
            .orElseThrow(() -> new ApiException(ErrorCode.SHARED_EVENT_NOT_FOUND));

        return SharedEventResponse.of(sharedEvent);
    }

    public void deleteSharedEvent(Long sharedEventId) {
        sharedEventRepository.deleteById(sharedEventId);
    }

}
