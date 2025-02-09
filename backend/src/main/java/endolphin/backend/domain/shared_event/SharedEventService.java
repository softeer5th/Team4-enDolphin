package endolphin.backend.domain.shared_event;

import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.shared_event.dto.SharedEventRequest;
import endolphin.backend.domain.shared_event.dto.SharedEventDto;
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
    public SharedEventDto getSharedEvent(Long sharedEventId) {
        SharedEvent sharedEvent = sharedEventRepository.findById(sharedEventId)
            .orElseThrow(() -> new ApiException(ErrorCode.SHARED_EVENT_NOT_FOUND));

        return SharedEventDto.of(sharedEvent);
    }

    public void deleteSharedEvent(Long sharedEventId) {
        if (!sharedEventRepository.existsById(sharedEventId)) {
            throw new ApiException(ErrorCode.SHARED_EVENT_NOT_FOUND);
        }
        sharedEventRepository.deleteById(sharedEventId);
    }

}
