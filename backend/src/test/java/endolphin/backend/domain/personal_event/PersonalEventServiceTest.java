package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.discussion.DiscussionParticipantService;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.enums.DiscussionStatus;
import endolphin.backend.domain.personal_event.dto.PersonalEventRequest;
import endolphin.backend.domain.personal_event.dto.PersonalEventResponse;
import endolphin.backend.domain.personal_event.dto.PersonalEventWithStatus;
import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.personal_event.enums.PersonalEventStatus;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.dto.ListResponse;
import endolphin.backend.global.google.dto.GoogleEvent;
import endolphin.backend.global.google.enums.GoogleEventStatus;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

@ExtendWith(MockitoExtension.class)
class PersonalEventServiceTest {

    @Mock
    private PersonalEventRepository personalEventRepository;

    @Mock
    private DiscussionParticipantService discussionParticipantService;

    @Mock
    private UserService userService;

    @Mock
    private PersonalEventPreprocessor personalEventPreprocessor;

    @InjectMocks
    private PersonalEventService personalEventService;

    private User testUser;
    private PersonalEventRequest request;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @BeforeEach
    void setUp() {
        testUser = User.builder().name("testUser").email("a@b.c").picture("picture_url").build();

        startTime = LocalDateTime.now();
        endTime = startTime.plusHours(1);
        request = new PersonalEventRequest("Test Event", startTime, endTime, true,
            false);
    }

    @Test
    @DisplayName("개인 일정 검색 테스트")
    void listPersonalEvents_Success() {
        // Given
        given(userService.getCurrentUser()).willReturn(testUser);

        LocalDateTime startDateTime = LocalDateTime.of(2025, 2, 2, 10, 0);
        LocalDateTime endDateTime = LocalDateTime.of(2025, 2, 9, 10, 0);

        PersonalEvent personalEvent1 = createPersonalEvent("Meeting1", 2, testUser);

        PersonalEvent personalEvent2 = createPersonalEvent("Meeting2", 4, testUser);
        List<PersonalEvent> eventList = List.of(
            personalEvent1, personalEvent2
        );

        given(personalEventRepository.findByUserAndStartTimeBetween(testUser, startDateTime,
            endDateTime)).willReturn(eventList);

        // When
        ListResponse<PersonalEventResponse> response = personalEventService.listPersonalEvents(
            startDateTime, endDateTime);

        // Then
        assertThat(response.data().size()).isEqualTo(2);
    }

    @Test
    @DisplayName("개인 일정 생성 테스트")
    void testCreatePersonalEvent() {
        // given
        given(userService.getCurrentUser()).willReturn(testUser);

        PersonalEvent savedEvent = createPersonalEvent(request.title(), 0, testUser);

        given(personalEventRepository.save(any(PersonalEvent.class))).willReturn(savedEvent);

        // when
        PersonalEventResponse response = personalEventService.createPersonalEvent(request);

        // then
        assertThat(response).isNotNull();
        assertThat(response.title()).isEqualTo(request.title());
        assertThat(response.startDateTime()).isEqualTo(startTime);

        verify(userService, times(1)).getCurrentUser();
        verify(personalEventRepository, times(1)).save(any(PersonalEvent.class));
    }

    @Test
    @DisplayName("개인 일정 업데이트 테스트")
    void testUpdatePersonalEvent_Success() {
        // given
        PersonalEvent existingEvent = createPersonalEvent("Old Title", 1, testUser);

        given(personalEventRepository.findById(anyLong())).willReturn(Optional.of(existingEvent));
        given(userService.getCurrentUser()).willReturn(testUser);

        // when
        PersonalEventResponse response = personalEventService.updatePersonalEvent(request,
            anyLong());

        // then
        assertThat(response).isNotNull();
        assertThat(response.title()).isEqualTo(request.title());

        then(personalEventRepository).should(times(1)).findById(anyLong());
        then(userService).should(times(1)).getCurrentUser();
        then(personalEventRepository).should(times(1)).save(any(PersonalEvent.class));
    }

    @Test
    @DisplayName("개인 일정 Not Found 에러")
    void testUpdatePersonalEvent_NotFound() {
        // given
        given(personalEventRepository.findById(anyLong())).willReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> personalEventService.updatePersonalEvent(request, 2L))
            .isInstanceOf(RuntimeException.class);

        then(personalEventRepository).should(times(1)).findById(anyLong());
        then(userService).should(never()).getCurrentUser();
    }

    @Test
    @DisplayName("개인 일정 업데이트 사용자 매칭 에러")
    void testUpdatePersonalEvent_Unauthorized() {
        // given
        User anotherUser = User.builder().name("anotherUser").email("another@email.com")
            .picture("another_picture").build();

        PersonalEvent existingEvent = createPersonalEvent("Old Title", 1, anotherUser);

        given(personalEventRepository.findById(anyLong())).willReturn(Optional.of(existingEvent));
        given(userService.getCurrentUser()).willReturn(testUser);

        // when & then
        assertThatThrownBy(() -> personalEventService.updatePersonalEvent(request, anyLong()))
            .isInstanceOf(RuntimeException.class);

        then(personalEventRepository).should(times(1)).findById(anyLong());
        then(userService).should(times(1)).getCurrentUser();
        then(personalEventRepository).should(never()).save(any(PersonalEvent.class));
    }

    @Test
    @DisplayName("개인 일정 삭제 사용자 매칭 에러")
    void testDeletePersonalEvent() {
        User anotherUser = User.builder().name("anotherUser").email("another@email.com")
            .picture("another_picture").build();

        PersonalEvent existingEvent = createPersonalEvent("Old Title", 1, anotherUser);
        given(personalEventRepository.findById(anyLong())).willReturn(Optional.of(existingEvent));
        given(userService.getCurrentUser()).willReturn(testUser);

        assertThatThrownBy(() -> personalEventService.deletePersonalEvent(anyLong()))
            .isInstanceOf(RuntimeException.class);

        then(personalEventRepository).should(times(1)).findById(anyLong());
        then(userService).should(times(1)).getCurrentUser();
        then(personalEventRepository).should(never()).save(any(PersonalEvent.class));
    }

    @Test
    @DisplayName("개인 일정 삭제 성공")
    void testDeletePersonalEvent_Success() {
        // given
        PersonalEvent event = createPersonalEvent("test Title", 0, testUser);

        given(personalEventRepository.findById(anyLong())).willReturn(Optional.of(event));
        given(userService.getCurrentUser()).willReturn(testUser);

        // when
        personalEventService.deletePersonalEvent(anyLong());

        // then
        then(personalEventRepository).should(times(1)).delete(any(PersonalEvent.class));
    }

    @Test
    @DisplayName("업데이트된 구글 일정을 개인 일정에 반영하는 테스트")
    public void testUpdatePersonalEventByGoogleSync_Success() {
        // given
        User user = createTestUser();
        String googleCalendarId = "testGoogleCalendarId";
        GoogleEvent updatedGoogleEvent = createGoogleEvent("testEventId1", "testTitle1",
            LocalDateTime.of(2024, 3, 10, 10, 0),
            LocalDateTime.of(2024, 3, 10, 12, 0), GoogleEventStatus.CONFIRMED);

        GoogleEvent deletedGoogleEvent = createGoogleEvent("testEventId2", "testTitle2",
            LocalDateTime.of(2024, 5, 10, 7, 0),
            LocalDateTime.of(2024, 5, 10, 12, 0), GoogleEventStatus.CANCELLED);
        Discussion discussion = createDiscussion();
        Discussion anotherDiscussion = createDiscussion();
        given(discussionParticipantService.getDiscussionsByUserId(anyLong())).willReturn(
            List.of(discussion, anotherDiscussion));

        PersonalEvent existingEvent = createPersonalEvent("new Title");
        given(existingEvent.getStartTime()).willReturn(LocalDateTime.of(2024, 3, 10, 10, 0));
        PersonalEvent oldExistingEvent = createPersonalEvent("Old Title");
        given(existingEvent.copy()).willReturn(oldExistingEvent);
        PersonalEvent existingEvent2 = createPersonalEvent("Old Title2");

        given(personalEventRepository.findByGoogleEventIdAndCalendarId(
            eq(updatedGoogleEvent.eventId()), eq(googleCalendarId))).willReturn(Optional.of(existingEvent));
        given(personalEventRepository.findByGoogleEventIdAndCalendarId(
            eq(deletedGoogleEvent.eventId()), eq(googleCalendarId))).willReturn(Optional.of(existingEvent2));

        // when
        personalEventService.syncWithGoogleEvents(List.of(updatedGoogleEvent, deletedGoogleEvent),
            user, googleCalendarId);

        // then
        then(personalEventPreprocessor).should(times(1))
            .preprocessOne(eq(oldExistingEvent), eq(discussion), any(User.class), eq(false));
        then(personalEventPreprocessor).should(times(1))
            .preprocessOne(eq(oldExistingEvent), eq(anotherDiscussion), any(User.class), eq(false));
        then(personalEventPreprocessor).should(times(1))
            .preprocessOne(eq(existingEvent), eq(discussion), any(User.class), eq(true));
        then(personalEventPreprocessor).should(times(1))
            .preprocessOne(eq(existingEvent), eq(anotherDiscussion), any(User.class), eq(true));

        then(personalEventPreprocessor).should(times(1))
            .preprocessOne(eq(existingEvent2), eq(discussion), any(User.class), eq(false));
        then(personalEventPreprocessor).should(times(1))
            .preprocessOne(eq(existingEvent2), eq(anotherDiscussion), any(User.class), eq(false));
    }

    PersonalEvent createPersonalEvent(String title, int minusHour, User user) {
        return PersonalEvent.builder()
            .title(title)
            .startTime(startTime.minusHours(minusHour))
            .endTime(endTime.minusHours(minusHour))
            .user(user)
            .build();
    }

    GoogleEvent createGoogleEvent(String eventId, String title, LocalDateTime startDateTime,
        LocalDateTime endDateTime, GoogleEventStatus status) {
        GoogleEvent googleEvent = Mockito.mock(GoogleEvent.class);
        given(googleEvent.eventId()).willReturn(eventId);
        given(googleEvent.status()).willReturn(status);
        return googleEvent;
    }

    Discussion createDiscussion() {
        Discussion discussion = Mockito.mock(Discussion.class);
        return discussion;
    }

    PersonalEvent createPersonalEvent(String title) {
        PersonalEvent personalEvent = Mockito.mock(PersonalEvent.class);
        return personalEvent;
    }

    User createTestUser() {
        User user = Mockito.mock(User.class);
        given(user.getId()).willReturn(1L);
        return user;
    }

    @Test
    @DisplayName("사용자별 개인 일정 상태를 조회한다")
    void findPersonalEventStatusesByUsers() {
        // given
        LocalDateTime now = LocalDateTime.of(2024, 2, 13, 12, 0);
        LocalDateTime searchStartTime = now.minusHours(3);
        LocalDateTime searchEndTime = now.plusHours(3);
        LocalDateTime startTime = now.minusHours(1);
        LocalDateTime endTime = now.plusHours(1);

        // Mock User 객체 생성 및 설정
        User user1 = mock(User.class);
        User user2 = mock(User.class);
        given(user1.getId()).willReturn(1L);
        given(user2.getId()).willReturn(2L);

        List<User> users = List.of(user1, user2);

        // Mock PersonalEvent 객체 생성 및 설정
        PersonalEvent event1 = mock(PersonalEvent.class);
        PersonalEvent event2 = mock(PersonalEvent.class);

        given(event1.getUser()).willReturn(user1);
        given(event1.getStartTime()).willReturn(now.minusHours(1));
        given(event1.getEndTime()).willReturn(now.plusHours(1));

        given(event2.getUser()).willReturn(user2);
        given(event2.getStartTime()).willReturn(now.minusHours(2));
        given(event2.getEndTime()).willReturn(now.plusHours(2));

        // Repository mock 설정
        given(personalEventRepository.findAllByUsersAndDateTimeRange(
            List.of(1L, 2L),
            searchStartTime,
            searchEndTime
        )).willReturn(List.of(event1, event2));

        // when
        Map<Long, List<PersonalEventWithStatus>> result = personalEventService
            .findPersonalEventStatusesByUsers(users, searchStartTime, searchEndTime, startTime, endTime);

        // then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(2);

        // user1의 일정 검증
        List<PersonalEventWithStatus> user1Events = result.get(1L);
        assertThat(user1Events)
            .isNotNull()
            .hasSize(1);
        assertThat(user1Events.get(0).id()).isEqualTo(event1.getId());

        // user2의 일정 검증
        List<PersonalEventWithStatus> user2Events = result.get(2L);
        assertThat(user2Events)
            .isNotNull()
            .hasSize(1);
        assertThat(user2Events.get(0).id()).isEqualTo(event2.getId());

        // Repository 호출 검증
        verify(personalEventRepository).findAllByUsersAndDateTimeRange(
            List.of(1L, 2L),
            searchStartTime,
            searchEndTime
        );
    }

    @Test
    @DisplayName("검색 기간 내 일정이 없는 경우 빈 맵을 반환한다")
    void findPersonalEventStatusesByUsers_returnsEmptyMap_whenNoEvents() {
        // given
        LocalDateTime now = LocalDateTime.of(2024, 2, 13, 12, 0);
        LocalDateTime searchStartTime = now.minusHours(3);
        LocalDateTime searchEndTime = now.plusHours(3);
        LocalDateTime startTime = now.minusHours(1);
        LocalDateTime endTime = now.plusHours(1);

        User user1 = mock(User.class);
        User user2 = mock(User.class);
        given(user1.getId()).willReturn(1L);
        given(user2.getId()).willReturn(2L);

        List<User> users = List.of(user1, user2);

        // Repository가 빈 리스트를 반환하도록 설정
        given(personalEventRepository.findAllByUsersAndDateTimeRange(
            List.of(1L, 2L),
            searchStartTime,
            searchEndTime
        )).willReturn(List.of());

        // when
        Map<Long, List<PersonalEventWithStatus>> result = personalEventService
            .findPersonalEventStatusesByUsers(users, searchStartTime, searchEndTime, startTime, endTime);

        // then
        assertThat(result).isEmpty();

        // Repository 호출 검증
        verify(personalEventRepository).findAllByUsersAndDateTimeRange(
            List.of(1L, 2L),
            searchStartTime,
            searchEndTime
        );
    }

    @Test
    @DisplayName("일정의 상태를 올바르게 계산한다")
    void findPersonalEventStatusesByUsers_calculatesEventStatus() {
        // given
        LocalDateTime now = LocalDateTime.of(2024, 2, 13, 12, 0);
        LocalDateTime searchStartTime = now.minusHours(3);
        LocalDateTime searchEndTime = now.plusHours(3);
        LocalDateTime startTime = now.minusHours(1);
        LocalDateTime endTime = now.plusHours(1);

        User user = mock(User.class);
        given(user.getId()).willReturn(1L);

        PersonalEvent event = mock(PersonalEvent.class);
        given(event.getUser()).willReturn(user);
        given(event.getStartTime()).willReturn(startTime);
        given(event.getEndTime()).willReturn(endTime);
        given(event.getIsAdjustable()).willReturn(true);

        given(personalEventRepository.findAllByUsersAndDateTimeRange(
            List.of(1L),
            searchStartTime,
            searchEndTime
        )).willReturn(List.of(event));

        // when
        Map<Long, List<PersonalEventWithStatus>> result = personalEventService
            .findPersonalEventStatusesByUsers(List.of(user), searchStartTime, searchEndTime, startTime, endTime);

        // then
        List<PersonalEventWithStatus> userEvents = result.get(1L);
        assertThat(userEvents).hasSize(1);

        PersonalEventWithStatus eventWithStatus = userEvents.get(0);
        assertThat(eventWithStatus.id()).isEqualTo(event.getId());
        assertThat(eventWithStatus.status()).isEqualTo(PersonalEventStatus.ADJUSTABLE);
//        assertThat(eventWithStatus.getEndDateTime()).isEqualTo(endTime);
    }
}
