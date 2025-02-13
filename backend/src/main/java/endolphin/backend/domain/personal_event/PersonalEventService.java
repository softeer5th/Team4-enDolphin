package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.discussion.DiscussionParticipantService;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.personal_event.dto.PersonalEventRequest;
import endolphin.backend.domain.personal_event.dto.PersonalEventResponse;
import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.shared_event.dto.SharedEventDto;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.dto.ListResponse;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.google.dto.GoogleEvent;
import endolphin.backend.global.google.enums.GoogleEventStatus;
import endolphin.backend.global.util.Validator;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PersonalEventService {

    private final PersonalEventRepository personalEventRepository;
    private final UserService userService;
    private final PersonalEventPreprocessor personalEventPreprocessor;
    private final DiscussionParticipantService discussionParticipantService;

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

    public void createPersonalEventsForParticipants(List<User> participants,
        Discussion discussion,
        SharedEventDto sharedEvent) {
        List<PersonalEvent> events = participants.stream()
            .map(participant -> PersonalEvent.builder()
                .title(discussion.getTitle())
                .startTime(sharedEvent.startDateTime())
                .endTime(sharedEvent.endDateTime())
                .user(participant)
                .build())
            .toList();

        personalEventRepository.saveAll(events);
    }

    public PersonalEventResponse updatePersonalEvent(PersonalEventRequest request,
        Long personalEventId) {
        PersonalEvent personalEvent = getPersonalEvent(personalEventId);
        User user = userService.getCurrentUser();

        Validator.validateDateTimeRange(request.startDateTime(), request.endDateTime());

        validatePersonalEventUser(personalEvent, user);

        personalEvent.update(request);
        personalEventRepository.save(personalEvent);
        return PersonalEventResponse.fromEntity(personalEvent);
    }

    public void deletePersonalEvent(Long personalEventId) {
        PersonalEvent personalEvent = getPersonalEvent(personalEventId);
        User user = userService.getCurrentUser();
        validatePersonalEventUser(personalEvent, user);

        personalEventRepository.delete(personalEvent);
    }

    public PersonalEvent getPersonalEvent(Long personalEventId) {
        return personalEventRepository.findById(personalEventId)
            .orElseThrow(() -> new ApiException(ErrorCode.PERSONAL_EVENT_NOT_FOUND));
    }

    public void preprocessPersonalEvents(User user, Discussion discussion) {
        List<PersonalEvent> personalEvents = personalEventRepository.findFilteredPersonalEvents(
            user, discussion.getDateRangeStart(), discussion.getDateRangeEnd());

        personalEventPreprocessor.preprocess(personalEvents, discussion, user);
    }

    public void syncWithGoogleEvents(List<GoogleEvent> googleEvents, User user,
        String googleCalendarId) {
        List<Discussion> discussions = discussionParticipantService.getDiscussionsByUserId(
            user.getId());
        for (GoogleEvent googleEvent : googleEvents) {
            if (googleEvent.status().equals(GoogleEventStatus.CONFIRMED)) {
                upsertPersonalEventByGoogleEvent(googleEvent, discussions, user, googleCalendarId);
            } else if (googleEvent.status().equals(GoogleEventStatus.CANCELLED)) {
                deletePersonalEventByGoogleEvent(googleEvent, discussions, user, googleCalendarId);
            }
        }
    }

    private void validatePersonalEventUser(PersonalEvent personalEvent, User user) {
        if (!personalEvent.getUser().equals(user)) {
            throw new ApiException(ErrorCode.INVALID_PERSONAL_EVENT_USER);
        }
    }

    private void upsertPersonalEventByGoogleEvent(GoogleEvent googleEvent,
        List<Discussion> discussions, User user, String googleCalendarId) {
        personalEventRepository.findByGoogleEventIdAndCalendarId(googleEvent.eventId(),
                googleCalendarId)
            .ifPresentOrElse(personalEvent -> {
                    if (hasChangedGoogleEvent(personalEvent, googleEvent)) {
                        PersonalEvent oldEvent = personalEvent.copy();
                        personalEvent.update(googleEvent.startDateTime(), googleEvent.endDateTime(),
                            googleEvent.summary());
                        personalEventRepository.save(personalEvent);
                        // 비트맵 수정
                        discussions.forEach(discussion -> {
                            personalEventPreprocessor.
                                preprocessOne(oldEvent, discussion, user, false);
                            personalEventPreprocessor
                                .preprocessOne(personalEvent, discussion, user, true);
                        });
                    }
                },
                () -> {
                    PersonalEvent personalEvent = PersonalEvent.from(googleEvent, user);
                    personalEventRepository.save(personalEvent);
                    // 비트맵 수정
                    discussions.forEach(discussion -> {
                        personalEventPreprocessor.preprocessOne(personalEvent, discussion, user,
                            true);
                    });
                });
    }

    private void deletePersonalEventByGoogleEvent(GoogleEvent googleEvent,
        List<Discussion> discussions, User user, String googleCalendarId) {
        personalEventRepository.findByGoogleEventIdAndCalendarId(googleEvent.eventId(),
                googleCalendarId)
            .ifPresent(personalEvent -> {
                // 비트맵 삭제
                discussions.forEach(discussion -> {
                    personalEventPreprocessor.preprocessOne(personalEvent, discussion, user, false);
                });
                personalEventRepository.delete(personalEvent);
            });
    }

    private boolean hasChangedGoogleEvent(PersonalEvent personalEvent, GoogleEvent googleEvent) {
        if (!personalEvent.getStartTime().equals(googleEvent.startDateTime())) {
            return true;
        }
        if (!personalEvent.getEndTime().equals(googleEvent.endDateTime())) {
            return true;
        }
        if (!personalEvent.getTitle().equals(googleEvent.summary())) {
            return true;
        }
        return false;
    }
}
