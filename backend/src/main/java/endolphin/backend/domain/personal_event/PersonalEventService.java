package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.personal_event.dto.PersonalEventRequest;
import endolphin.backend.domain.personal_event.dto.PersonalEventResponse;
import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.shared_event.dto.SharedEventDto;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.dto.ListResponse;
import endolphin.backend.global.util.Validator;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PersonalEventService {

    private final PersonalEventRepository personalEventRepository;
    private final UserService userService;

    @Transactional(readOnly = true)
    public ListResponse<PersonalEventResponse> listPersonalEvents(LocalDateTime startDateTime,
        LocalDateTime endDateTime) {
        User user = userService.getCurrentUser();

        Validator.validateDateTimeRange(startDateTime, endDateTime);

        List<PersonalEventResponse> personalEventResponseList = personalEventRepository.findByUserAndStartTimeBetween(
                user, startDateTime, endDateTime)
            .stream().map(PersonalEventResponse::fromEntity).toList();
        return new ListResponse<>(personalEventResponseList);
    }

    public PersonalEventResponse createPersonalEvent(PersonalEventRequest request) {
        User user = userService.getCurrentUser();

        Validator.validateDateTimeRange(request.startDateTime(), request.endDateTime());

        PersonalEvent personalEvent = PersonalEvent.builder()
            .title(request.title())
            .endTime(request.endDateTime())
            .startTime(request.startDateTime())
            .user(user)
            .build();
        PersonalEvent result = personalEventRepository.save(personalEvent);
        return PersonalEventResponse.fromEntity(result);
    }

    @Async
    public CompletableFuture<Void> createPersonalEventsForParticipants(List<User> participants,
        Discussion discussion,
        SharedEventDto sharedEvent) {
        try {
            List<PersonalEvent> events = participants.stream()
                .map(participant -> PersonalEvent.builder()
                    .title(discussion.getTitle())
                    .startTime(sharedEvent.startDateTime())
                    .endTime(sharedEvent.endDateTime())
                    .user(participant)
                    .build())
                .toList();

            personalEventRepository.saveAll(events);

            return CompletableFuture.completedFuture(null);
        } catch (Exception ex) {
            return CompletableFuture.failedFuture(ex);
        }
    }

    public PersonalEventResponse updatePersonalEvent(PersonalEventRequest request,
        Long personalEventId) {
        PersonalEvent personalEvent = getPersonalEvent(personalEventId);
        User user = userService.getCurrentUser();

        Validator.validateDateTimeRange(request.startDateTime(), request.endDateTime());

        if (!personalEvent.getUser().equals(user)) {
            throw new RuntimeException("You are not allowed to update this personal event");
        }

        personalEvent.update(request);
        personalEventRepository.save(personalEvent);
        return PersonalEventResponse.fromEntity(personalEvent);
    }

    public void deletePersonalEvent(Long personalEventId) {
        PersonalEvent personalEvent = getPersonalEvent(personalEventId);
        User user = userService.getCurrentUser();
        if (!personalEvent.getUser().equals(user)) {
            throw new RuntimeException("You are not allowed to delete this personal event");
        }
        personalEventRepository.delete(personalEvent);
    }

    public PersonalEvent getPersonalEvent(Long personalEventId) {
        return personalEventRepository.findById(personalEventId)
            .orElseThrow(() -> new RuntimeException("Personal event not found"));
    }
}
