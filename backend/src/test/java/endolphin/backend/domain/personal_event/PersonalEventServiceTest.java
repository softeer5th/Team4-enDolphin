package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.discussion.DiscussionParticipantService;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.personal_event.dto.PersonalEventRequest;
import endolphin.backend.domain.personal_event.dto.PersonalEventResponse;
import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.dto.UserInfoWithPersonalEvents;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.dto.ListResponse;
import java.time.LocalDate;
import endolphin.backend.global.google.dto.GoogleEvent;
import endolphin.backend.global.google.enums.GoogleEventStatus;
import java.util.HashMap;
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

        LocalDate startDate = LocalDate.of(2025, 2, 2);
        LocalDate endDate = LocalDate.of(2025, 2, 9);

        PersonalEvent personalEvent1 = createWithRequest("Meeting1", 2, testUser);

        PersonalEvent personalEvent2 = createWithRequest("Meeting2", 4, testUser);
        List<PersonalEvent> eventList = List.of(
            personalEvent1, personalEvent2
        );

        given(personalEventRepository.findByUserAndStartTimeBetween(testUser, startDate.atStartOfDay(),
            endDate.atTime(23, 59))).willReturn(eventList);

        // When
        ListResponse<PersonalEventResponse> response = personalEventService.listPersonalEvents(
            startDate, endDate);

        // Then
        assertThat(response.data().size()).isEqualTo(2);
    }

    @Test
    @DisplayName("개인 일정 생성 테스트")
    void testCreateWithRequest() {
        // given
        given(userService.getCurrentUser()).willReturn(testUser);

        PersonalEvent savedEvent = createWithRequest(request.title(), 0, testUser);

        given(personalEventRepository.save(any(PersonalEvent.class))).willReturn(savedEvent);

        // when
        PersonalEventResponse response = personalEventService.createWithRequest(request);

        // then
        assertThat(response).isNotNull();
        assertThat(response.title()).isEqualTo(request.title());
        assertThat(response.startDateTime()).isEqualTo(startTime);

        verify(userService, times(1)).getCurrentUser();
        verify(personalEventRepository, times(1)).save(any(PersonalEvent.class));
    }

    @Test
    @DisplayName("개인 일정 업데이트 테스트")
    void testUpdateWithRequest_Success() {
        // given
        PersonalEvent existingEvent = createWithRequest("Old Title", 1, testUser);
        PersonalEvent updatedEvent = createWithRequest(request.title(), 1, testUser);

        given(personalEventRepository.findById(anyLong())).willReturn(Optional.of(existingEvent));
        given(userService.getCurrentUser()).willReturn(testUser);
        given(personalEventRepository.save(any(PersonalEvent.class))).willReturn(updatedEvent);

        // when
        PersonalEventResponse response = personalEventService.updateWithRequest(request,
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
    void testUpdateWithRequest_NotFound() {
        // given
        given(personalEventRepository.findById(anyLong())).willReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> personalEventService.updateWithRequest(request, 2L))
            .isInstanceOf(RuntimeException.class);

        then(personalEventRepository).should(times(1)).findById(anyLong());
        then(userService).should(never()).getCurrentUser();
    }

    @Test
    @DisplayName("개인 일정 업데이트 사용자 매칭 에러")
    void testUpdateWithRequest_Unauthorized() {
        // given
        User anotherUser = User.builder().name("anotherUser").email("another@email.com")
            .picture("another_picture").build();

        PersonalEvent existingEvent = createWithRequest("Old Title", 1, anotherUser);

        given(personalEventRepository.findById(anyLong())).willReturn(Optional.of(existingEvent));
        given(userService.getCurrentUser()).willReturn(testUser);

        // when & then
        assertThatThrownBy(() -> personalEventService.updateWithRequest(request, anyLong()))
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

        PersonalEvent existingEvent = createWithRequest("Old Title", 1, anotherUser);
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
        PersonalEvent event = createWithRequest("test Title", 0, testUser);

        given(personalEventRepository.findById(anyLong())).willReturn(Optional.of(event));
        given(userService.getCurrentUser()).willReturn(testUser);

        // when
        personalEventService.deletePersonalEvent(anyLong());

        // then
        then(personalEventRepository).should(times(1)).delete(any(PersonalEvent.class));
    }

    @Test
    @DisplayName("업데이트된 구글 일정을 개인 일정에 반영하는 테스트")
    public void testUpdateWithRequestByGoogleSync_Success() {
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

        PersonalEvent existingEvent = createWithRequest("new Title");
        given(existingEvent.getStartTime()).willReturn(LocalDateTime.of(2024, 3, 10, 10, 0));
        PersonalEvent oldExistingEvent = createWithRequest("Old Title");
        given(existingEvent.copy()).willReturn(oldExistingEvent);
        PersonalEvent existingEvent2 = createWithRequest("Old Title2");

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

    PersonalEvent createWithRequest(String title, int minusHour, User user) {
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

    PersonalEvent createWithRequest(String title) {
        PersonalEvent personalEvent = Mockito.mock(PersonalEvent.class);
        return personalEvent;
    }

    User createTestUser() {
        User user = Mockito.mock(User.class);
        given(user.getId()).willReturn(1L);
        return user;
    }

    @Test
    @DisplayName("사용자별 개인 일정 정보를 조회하고 일정 조정 필요 여부에 따라 정렬한다")
    void findUserInfoWithPersonalEventsByUsers() {
        // given
        LocalDateTime now = LocalDateTime.of(2024, 2, 13, 12, 0);
        LocalDateTime searchStartTime = now.minusHours(3);
        LocalDateTime searchEndTime = now.plusHours(3);
        LocalDateTime startTime = now.minusHours(1);
        LocalDateTime endTime = now.plusHours(1);

        // Mock User 객체 생성
        User user1 = mock(User.class);
        User user2 = mock(User.class);
        User user3 = mock(User.class);

        given(user1.getId()).willReturn(1L);
        given(user1.getName()).willReturn("User 1");
        given(user1.getPicture()).willReturn("picture1.jpg");

        given(user2.getId()).willReturn(2L);
        given(user2.getName()).willReturn("User 2");
        given(user2.getPicture()).willReturn("picture2.jpg");

        given(user3.getId()).willReturn(3L);
        given(user3.getName()).willReturn("User 3");
        given(user3.getPicture()).willReturn("picture3.jpg");

        List<User> users = List.of(user1, user2, user3);

        // Mock PersonalEvent 객체 생성
        PersonalEvent event1 = mock(PersonalEvent.class);
        PersonalEvent event2 = mock(PersonalEvent.class);
        PersonalEvent event3 = mock(PersonalEvent.class);

        // user1의 이벤트: 조정 필요 없음 (범위 밖)
        given(event1.getUser()).willReturn(user1);
        given(event1.getStartTime()).willReturn(now.plusHours(2));
        given(event1.getEndTime()).willReturn(now.plusHours(3));

        // user2의 이벤트: 조정 필요함 (범위 내)
        given(event2.getUser()).willReturn(user2);
        given(event2.getStartTime()).willReturn(startTime);
        given(event2.getEndTime()).willReturn(endTime);

        // user3의 이벤트: 조정 필요함 (범위와 겹침)
        given(event3.getUser()).willReturn(user3);
        given(event3.getStartTime()).willReturn(now.minusMinutes(30));
        given(event3.getEndTime()).willReturn(now.plusMinutes(30));

        given(personalEventRepository.findAllByUsersAndDateTimeRange(
            List.of(1L, 2L, 3L),
            searchStartTime,
            searchEndTime
        )).willReturn(List.of(event1, event2, event3));

        // selectedUserIds 설정
        Map<Long, Integer> selectedUserIds = new HashMap<>();
        selectedUserIds.put(1L, 0);
        selectedUserIds.put(2L, 1);

        // when
        List<UserInfoWithPersonalEvents> result = personalEventService.findUserInfoWithPersonalEventsByUsers(
            users,
            searchStartTime,
            searchEndTime,
            startTime,
            endTime,
            selectedUserIds
        );

        // then
        assertThat(result).hasSize(3);

        // 조정이 필요한 사용자가 앞쪽에 정렬되었는지 확인
        assertThat(result.get(0).requirementOfAdjustment()).isTrue();
        assertThat(result.get(1).requirementOfAdjustment()).isTrue();
        assertThat(result.get(2).requirementOfAdjustment()).isFalse();

        // 각 사용자별 정보가 올바르게 설정되었는지 확인
        for (UserInfoWithPersonalEvents userInfo : result) {
            if (userInfo.id().equals(1L)) {
                assertThat(userInfo.selected()).isTrue();
                assertThat(userInfo.requirementOfAdjustment()).isFalse();
            } else if (userInfo.id().equals(2L)) {
                assertThat(userInfo.selected()).isTrue();
                assertThat(userInfo.requirementOfAdjustment()).isTrue();
            } else if (userInfo.id().equals(3L)) {
                assertThat(userInfo.selected()).isFalse();
                assertThat(userInfo.requirementOfAdjustment()).isTrue();
            }
        }
    }

    @Test
    @DisplayName("개인 일정이 없는 사용자도 결과에 포함된다")
    void findUserInfoWithPersonalEventsByUsers_includesUsersWithNoEvents() {
        // given
        LocalDateTime now = LocalDateTime.of(2024, 2, 13, 12, 0);
        LocalDateTime searchStartTime = now.minusHours(3);
        LocalDateTime searchEndTime = now.plusHours(3);
        LocalDateTime startTime = now.minusHours(1);
        LocalDateTime endTime = now.plusHours(1);

        User user1 = mock(User.class);
        User user2 = mock(User.class);

        given(user1.getId()).willReturn(1L);
        given(user1.getName()).willReturn("User 1");
        given(user1.getPicture()).willReturn("picture1.jpg");

        given(user2.getId()).willReturn(2L);
        given(user2.getName()).willReturn("User 2");
        given(user2.getPicture()).willReturn("picture2.jpg");

        List<User> users = List.of(user1, user2);

        // user1만 이벤트가 있는 상황
        PersonalEvent event1 = mock(PersonalEvent.class);
        given(event1.getUser()).willReturn(user1);
        given(event1.getStartTime()).willReturn(now.plusHours(2));
        given(event1.getEndTime()).willReturn(now.plusHours(3));

        given(personalEventRepository.findAllByUsersAndDateTimeRange(
            List.of(1L, 2L),
            searchStartTime,
            searchEndTime
        )).willReturn(List.of(event1));

        Map<Long, Integer> selectedUserIds = new HashMap<>();
        selectedUserIds.put(1L, 0);

        // when
        List<UserInfoWithPersonalEvents> result = personalEventService.findUserInfoWithPersonalEventsByUsers(
            users,
            searchStartTime,
            searchEndTime,
            startTime,
            endTime,
            selectedUserIds
        );

        // then
        assertThat(result).hasSize(2);

        // user1 검증
        UserInfoWithPersonalEvents user1Info = result.stream()
            .filter(u -> u.id().equals(1L))
            .findFirst()
            .orElseThrow();
        assertThat(user1Info.selected()).isTrue();
        assertThat(user1Info.requirementOfAdjustment()).isFalse();
        assertThat(user1Info.events()).isNotEmpty();

        // user2 검증
        UserInfoWithPersonalEvents user2Info = result.stream()
            .filter(u -> u.id().equals(2L))
            .findFirst()
            .orElseThrow();
        assertThat(user2Info.selected()).isFalse();
        assertThat(user2Info.requirementOfAdjustment()).isFalse();
        assertThat(user2Info.events()).isEmpty();
    }
}
