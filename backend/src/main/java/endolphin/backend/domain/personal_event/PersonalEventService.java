package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.calendar.CalendarService;
import endolphin.backend.domain.discussion.DiscussionParticipantService;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.personal_event.dto.PersonalEventRequest;
import endolphin.backend.domain.personal_event.dto.PersonalEventResponse;
import endolphin.backend.domain.personal_event.dto.PersonalEventWithStatus;
import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.personal_event.enums.PersonalEventStatus;
import endolphin.backend.domain.personal_event.event.DeletePersonalEvent;
import endolphin.backend.domain.personal_event.event.UpdatePersonalEvent;
import endolphin.backend.domain.shared_event.dto.SharedEventDto;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.dto.UserInfoWithPersonalEvents;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.dto.ListResponse;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.google.dto.GoogleEvent;
import endolphin.backend.global.google.enums.GoogleEventStatus;
import endolphin.backend.domain.personal_event.event.InsertPersonalEvent;
import endolphin.backend.global.util.IdGenerator;
import endolphin.backend.global.util.Validator;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PersonalEventService {

    private final PersonalEventRepository personalEventRepository;
    private final UserService userService;
    private final PersonalEventPreprocessor personalEventPreprocessor;
    private final DiscussionParticipantService discussionParticipantService;
    private final ApplicationEventPublisher eventPublisher;
    private final CalendarService calendarService;

    @Transactional(readOnly = true)
    public ListResponse<PersonalEventResponse> listPersonalEvents(LocalDate startDate,
        LocalDate endDate) {
        User user = userService.getCurrentUser();

        Validator.validateDateTimeRange(startDate, endDate);

        List<PersonalEventResponse> personalEventResponseList = personalEventRepository.findFilteredPersonalEvents(
                user, startDate, endDate)
            .stream().map(PersonalEventResponse::fromEntity).toList();
        return new ListResponse<>(personalEventResponseList);
    }

    public PersonalEventResponse createWithRequest(PersonalEventRequest request) {
        User user = userService.getCurrentUser();

        Validator.validateDateTimeRange(request.startDateTime(), request.endDateTime());

        PersonalEvent personalEvent = PersonalEvent.builder()
            .title(request.title())
            .endTime(request.endDateTime())
            .startTime(request.startDateTime())
            .isAdjustable(request.isAdjustable())
            .user(user)
            .build();

        PersonalEvent result = personalEventRepository.save(personalEvent);

        if (request.syncWithGoogleCalendar()) {
            String calendarId = calendarService.getCalendarIdByUser(user);
            personalEvent.setGoogleEventId(IdGenerator.generateId(user.getId()));
            personalEvent.setCalendarId(calendarId);
            eventPublisher.publishEvent(new InsertPersonalEvent(List.of(personalEvent)));
        }

        List<Discussion> discussions = discussionParticipantService.getDiscussionsByUserId(
            user.getId());

        discussions.forEach(discussion -> {
            personalEventPreprocessor.preprocessOne(result, discussion, user,
                true);
        });

        return PersonalEventResponse.fromEntity(result);
    }

    public void createPersonalEventsForParticipants(List<User> participants,
        Discussion discussion,
        SharedEventDto sharedEvent) {
        List<Long> userIds = participants.stream().map(User::getId).toList();
        Map<Long, String> calendarIdMap = calendarService.getCalendarIdByUsers(userIds);
        List<PersonalEvent> events = participants.stream()
            .map(participant -> {
                String googleEventId = IdGenerator.generateId(participant.getId());
                return PersonalEvent.builder()
                    .title(discussion.getTitle())
                    .startTime(sharedEvent.startDateTime())
                    .endTime(sharedEvent.endDateTime())
                    .user(participant)
                    .isAdjustable(false)
                    .googleEventId(googleEventId)
                    .calendarId(calendarIdMap.get(participant.getId()))
                    .build();
            })
            .toList();
        personalEventPreprocessor.preprocess(events, true);

        personalEventRepository.saveAll(events);
        eventPublisher.publishEvent(new InsertPersonalEvent(events));
    }

    public PersonalEventResponse updateWithRequest(PersonalEventRequest request,
        Long personalEventId) {
        PersonalEvent personalEvent = getPersonalEvent(personalEventId);
        User user = userService.getCurrentUser();

        Validator.validateDateTimeRange(request.startDateTime(), request.endDateTime());

        validatePersonalEventUser(personalEvent, user);

        boolean syncInsert = syncInsert(personalEvent, request);
        boolean syncUpdate = syncUpdate(personalEvent, request);

        List<Discussion> discussions = discussionParticipantService.getDiscussionsByUserId(
            user.getId());

        PersonalEvent result = updatePersonalEvent(request, personalEvent, user, discussions);

        if (syncInsert) {
            String calendarId = calendarService.getCalendarIdByUser(user);
            result.update(IdGenerator.generateId(user.getId()), calendarId);
            eventPublisher.publishEvent(new InsertPersonalEvent(List.of(result)));
        } else if (syncUpdate) {
            eventPublisher.publishEvent(new UpdatePersonalEvent(result));
        }

        return PersonalEventResponse.fromEntity(result);
    }

    private boolean syncUpdate(PersonalEvent personalEvent, PersonalEventRequest request) {
        return request.syncWithGoogleCalendar()
            && (isDateTimeChanged(personalEvent, request)
            || !StringUtils.equals(personalEvent.getTitle(), request.title()));
    }

    private boolean syncInsert(PersonalEvent personalEvent, PersonalEventRequest request) {
        return request.syncWithGoogleCalendar()
            && personalEvent.getGoogleEventId() == null
            && personalEvent.getCalendarId() == null;
    }

    private PersonalEvent updatePersonalEvent(PersonalEventRequest request,
        PersonalEvent personalEvent,
        User user, List<Discussion> discussions) {

        PersonalEvent oldEvent = personalEvent.copy();

        personalEvent.update(request);

        if (isDateTimeChanged(personalEvent, request)) {
            discussions.forEach(discussion -> {
                personalEventPreprocessor.
                    preprocessOne(oldEvent, discussion, user, false);
                personalEventPreprocessor
                    .preprocessOne(personalEvent, discussion, user, true);
            });
        }

        return personalEventRepository.save(personalEvent);
    }

    public void deleteWithRequest(Long personalEventId, Boolean syncWithGoogleCalendar) {
        PersonalEvent personalEvent = getPersonalEvent(personalEventId);
        User user = userService.getCurrentUser();
        validatePersonalEventUser(personalEvent, user);
        List<Discussion> discussions = discussionParticipantService.getDiscussionsByUserId(
            user.getId());

        deletePersonalEvent(personalEvent, user, discussions);

        if (syncWithGoogleCalendar
            && personalEvent.getGoogleEventId() != null
            && personalEvent.getCalendarId() != null) {
            eventPublisher.publishEvent(new DeletePersonalEvent(personalEvent));
        }
    }

    private void deletePersonalEvent(PersonalEvent personalEvent, User user,
        List<Discussion> discussions) {
        discussions.forEach(discussion -> {
            personalEventPreprocessor.preprocessOne(personalEvent, discussion, user, false);
        });

        personalEventRepository.delete(personalEvent);
    }

    @Transactional(readOnly = true)
    public PersonalEvent getPersonalEvent(Long personalEventId) {
        return personalEventRepository.findById(personalEventId)
            .orElseThrow(() -> new ApiException(ErrorCode.PERSONAL_EVENT_NOT_FOUND));
    }

    public void preprocessPersonalEvents(User user, Discussion discussion) {
        List<PersonalEvent> personalEvents = personalEventRepository.findFilteredPersonalEvents(
            user, discussion.getDateRangeStart(), discussion.getDateRangeEnd());

        personalEventPreprocessor.preprocess(personalEvents, discussion, user);
    }

    public Set<LocalDate> syncWithGoogleEvents(List<GoogleEvent> googleEvents, User user,
        String googleCalendarId) {
        List<Discussion> discussions = discussionParticipantService.getDiscussionsByUserId(
            user.getId());
        Set<LocalDate> changedDates = new HashSet<>();
        for (GoogleEvent googleEvent : googleEvents) {
            log.info("Processing Google event: {}", googleEvent);
            if (googleEvent.status().equals(GoogleEventStatus.CONFIRMED)) {
                upsertPersonalEventByGoogleEvent(googleEvent, discussions, user, googleCalendarId,
                    changedDates);
                changedDates.add(googleEvent.startDateTime().toLocalDate());
                changedDates.add(googleEvent.endDateTime().toLocalDate());
            } else if (googleEvent.status().equals(GoogleEventStatus.CANCELLED)) {
                deletePersonalEventByGoogleEvent(googleEvent, discussions, user, googleCalendarId,
                    changedDates);
            }
        }
        return changedDates;
    }

    private void validatePersonalEventUser(PersonalEvent personalEvent, User user) {
        if (!personalEvent.getUser().equals(user)) {
            throw new ApiException(ErrorCode.INVALID_PERSONAL_EVENT_USER);
        }
    }

    private void upsertPersonalEventByGoogleEvent(GoogleEvent googleEvent,
        List<Discussion> discussions, User user, String googleCalendarId,
        Set<LocalDate> changedDates) {
        log.info("Upserting personal event by Google event: {}", googleEvent);
        personalEventRepository.findByGoogleEventIdAndCalendarId(googleEvent.eventId(),
                googleCalendarId)
            .ifPresentOrElse(personalEvent -> {
                    changedDates.add(personalEvent.getStartTime().toLocalDate());
                    changedDates.add(personalEvent.getEndTime().toLocalDate());
                    updatePersonalEvent(
                        PersonalEventRequest.of(googleEvent, personalEvent.getIsAdjustable()),
                        personalEvent, user, discussions);
                },
                () -> {
                    PersonalEvent personalEvent =
                        PersonalEvent.fromGoogleEvent(googleEvent, user, googleCalendarId);
                    personalEventRepository.save(personalEvent);
                    // 비트맵 수정
                    discussions.forEach(discussion -> {
                        personalEventPreprocessor.preprocessOne(personalEvent, discussion, user,
                            true);
                    });
                });
    }

    private void deletePersonalEventByGoogleEvent(GoogleEvent googleEvent,
        List<Discussion> discussions, User user, String googleCalendarId,
        Set<LocalDate> changedDates) {
        log.info("Deleting personal event by Google event: {}", googleEvent);
        personalEventRepository.findByGoogleEventIdAndCalendarId(googleEvent.eventId(),
                googleCalendarId)
            .ifPresent(personalEvent -> {
                changedDates.add(personalEvent.getStartTime().toLocalDate());
                changedDates.add(personalEvent.getEndTime().toLocalDate());
                deletePersonalEvent(personalEvent, user, discussions);
            });
    }

    private boolean isDateTimeChanged(PersonalEvent personalEvent, PersonalEventRequest newEvent) {
        return !personalEvent.getStartTime().equals(newEvent.startDateTime())
            || !personalEvent.getEndTime().equals(newEvent.endDateTime());
    }

    @Transactional(readOnly = true)
    public List<UserInfoWithPersonalEvents> findUserInfoWithPersonalEventsByUsers(
        List<User> users, LocalDateTime searchStartTime, LocalDateTime searchEndTime,
        LocalDateTime startTime, LocalDateTime endTime, Map<Long, Integer> selectedUserIds
    ) {
        List<Long> userIdList = users.stream().map(User::getId).toList();
        List<PersonalEvent> personalEvents =
            personalEventRepository.findAllByUsersAndDateTimeRange(userIdList, searchStartTime,
                searchEndTime);
        Map<Long, List<PersonalEventWithStatus>> personalEventsByUserId = new HashMap<>();

        List<UserInfoWithPersonalEvents> result = new ArrayList<>();

        for (PersonalEvent ps : personalEvents) {
            personalEventsByUserId.computeIfAbsent(ps.getUser().getId(), k -> new ArrayList<>())
                .add(PersonalEventWithStatus.from(ps, startTime, endTime));
        }

        for (User user : users) {
            List<PersonalEventWithStatus> personalEventWithStatuses
                = personalEventsByUserId.getOrDefault(user.getId(), new ArrayList<>());
            boolean requiredOfAdjustment =
                personalEventWithStatuses != null && personalEventWithStatuses.stream()
                    .anyMatch(p -> p.status() != PersonalEventStatus.OUT_OF_RANGE);
            result.add(new UserInfoWithPersonalEvents(
                user.getId(), user.getName(), user.getPicture(),
                selectedUserIds.containsKey(user.getId()),
                requiredOfAdjustment, personalEventWithStatuses));
        }
        result.sort(
            Comparator.comparing(UserInfoWithPersonalEvents::requirementOfAdjustment).reversed());
        return result;
    }
}
