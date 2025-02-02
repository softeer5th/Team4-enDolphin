package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.personal_event.dto.PersonalEventRequest;
import endolphin.backend.domain.personal_event.dto.PersonalEventResponse;
import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PersonalEventService {

    private final PersonalEventRepository personalEventRepository;
    private final UserService userService;

    public PersonalEventResponse createPersonalEvent(PersonalEventRequest request) {
        User user = userService.getUser();
        PersonalEvent personalEvent = PersonalEvent.builder()
            .title(request.title())
            .endTime(request.endTime())
            .startTime(request.startTime())
            .user(user)
            .build();
        PersonalEvent result = personalEventRepository.save(personalEvent);
        return new PersonalEventResponse(result.getId(), result.getTitle(), result.getStartTime(),
            result.getEndTime(), result.getIsAdjustable());
    }

    public PersonalEventResponse updatePersonalEvent(PersonalEventRequest request,
        Long personalEventId) {
        PersonalEvent personalEvent = personalEventRepository.findById(personalEventId)
            .orElseThrow(() -> new RuntimeException("Personal event not found"));
        User user = userService.getUser();

        if (!personalEvent.getUser().equals(user)) {
            throw new RuntimeException("You are not allowed to update this personal event");
        }

        PersonalEvent updatedPersonalEvent = personalEvent.update(request);
        personalEventRepository.save(updatedPersonalEvent);
        return new PersonalEventResponse(updatedPersonalEvent.getId(),
            updatedPersonalEvent.getTitle(), updatedPersonalEvent.getStartTime(),
            updatedPersonalEvent.getEndTime(), updatedPersonalEvent.getIsAdjustable());
    }
}
