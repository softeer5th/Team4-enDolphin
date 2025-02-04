package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.personal_event.dto.PersonalEventRequest;
import endolphin.backend.domain.personal_event.dto.PersonalEventResponse;
import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.dto.ListResponse;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
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
    private UserService userService;

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
        PersonalEventResponse response = personalEventService.updatePersonalEvent(request, anyLong());

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

    PersonalEvent createPersonalEvent(String title, int minusHour, User user) {
        return PersonalEvent.builder()
            .title(title)
            .startTime(startTime.minusHours(minusHour))
            .endTime(endTime.minusHours(minusHour))
            .user(user)
            .build();
    }
}
