package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.discussion.DiscussionParticipantService;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.personal_event.dto.PersonalEventRequest;
import endolphin.backend.domain.personal_event.dto.PersonalEventResponse;
import endolphin.backend.domain.personal_event.dto.PersonalEventWithStatus;
import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.personal_event.enums.PersonalEventStatus;
import endolphin.backend.domain.shared_event.dto.SharedEventDto;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.dto.UserInfoWithPersonalEvents;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.dto.ListResponse;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.google.GoogleCalendarService;
import endolphin.backend.global.google.dto.GoogleEvent;
import endolphin.backend.global.google.enums.GoogleEventStatus;
import endolphin.backend.global.util.Validator;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
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
    private final GoogleCalendarService googleCalendarService;

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

        List<Discussion> discussions = discussionParticipantService.getDiscussionsByUserId(
            user.getId());

        discussions.forEach(discussion -> {
            personalEventPreprocessor.preprocessOne(result, discussion, user,
                true);
        });

        //TODO syncWithGoogleCalendar == true 일 때 구글 캘린더에도 업데이트

        googleCalendarService.insertPersonalEventToGoogleCalendar(personalEvent);
        // TODO: 비트맵 반영
        return PersonalEventResponse.fromEntity(result);
    }

    public void createPersonalEventsForParticipants(List<User> participants,
        Discussion discussion,
        SharedEventDto sharedEvent) {
        List<PersonalEvent> events = participants.stream()
            .map(participant -> {
                String googleEventId = createGoogleEventId(participant.getId());
                return PersonalEvent.builder()
                    .title(discussion.getTitle())
                    .startTime(sharedEvent.startDateTime())
                    .endTime(sharedEvent.endDateTime())
                    .user(participant)
                    .isAdjustable(false)
                    .googleEventId(googleEventId)
                    .calendarId("primary")
                    .build();
            })
            .toList();
        personalEventRepository.saveAll(events);
        googleCalendarService.insertPersonalEvents(events);

        //TODO 구글캘린더에 반영
    }

    public PersonalEventResponse updateWithRequest(PersonalEventRequest request,
        Long personalEventId) {
        PersonalEvent personalEvent = getPersonalEvent(personalEventId);
        User user = userService.getCurrentUser();

        Validator.validateDateTimeRange(request.startDateTime(), request.endDateTime());

        validatePersonalEventUser(personalEvent, user);

        List<Discussion> discussions = discussionParticipantService.getDiscussionsByUserId(
            user.getId());

        PersonalEvent result = updatePersonalEvent(request, personalEvent, user, discussions);

        //TODO syncWithGoogleCalendar == true 일 때 구글 캘린더에도 업데이트

        return PersonalEventResponse.fromEntity(result);
    }

    private PersonalEvent updatePersonalEvent(PersonalEventRequest request,
        PersonalEvent personalEvent,
        User user, List<Discussion> discussions) {

        PersonalEvent oldEvent = personalEvent.copy();

        personalEvent.update(request);

        if (isChanged(personalEvent, request)) {
            discussions.forEach(discussion -> {
                personalEventPreprocessor.
                    preprocessOne(oldEvent, discussion, user, false);
                personalEventPreprocessor
                    .preprocessOne(personalEvent, discussion, user, true);
            });
        }

        return personalEventRepository.save(personalEvent);
    }

    public void deletePersonalEvent(Long personalEventId) {
        PersonalEvent personalEvent = getPersonalEvent(personalEventId);
        User user = userService.getCurrentUser();
        validatePersonalEventUser(personalEvent, user);
        List<Discussion> discussions = discussionParticipantService.getDiscussionsByUserId(
            user.getId());

        discussions.forEach(discussion -> {
            personalEventPreprocessor.preprocessOne(personalEvent, discussion, user, false);
        });
        //TODO SyncWithGoogleCalendar == true 일 때 구글 캘린더에도 업데이트

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
                    updatePersonalEvent(PersonalEventRequest.of(googleEvent), personalEvent, user,
                        discussions);
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

    private boolean isChanged(PersonalEvent personalEvent, PersonalEventRequest newEvent) {
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

    private String createGoogleEventId(Long id) {
        final String PREFIX = "endolphin";
        return String.format("%s%d%s",
            PREFIX, id,
            Base64.getEncoder().encodeToString(UUID.randomUUID().toString().getBytes())
                .toLowerCase());
    }
}
