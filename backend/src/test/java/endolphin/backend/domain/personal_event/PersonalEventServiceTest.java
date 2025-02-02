package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.personal_event.dto.ListPersonalEventResponse;
import endolphin.backend.domain.personal_event.dto.PersonalEventRequest;
import endolphin.backend.domain.personal_event.dto.PersonalEventResponse;
import endolphin.backend.domain.personal_event.dto.PersonalEventSearchRequest;
import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.entity.User;
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
        request = new PersonalEventRequest("Test Event", startTime, endTime, true);
    }

    @Test
    @DisplayName("개인 일정 검색 테스트")
    void listPersonalEvents_Success() {
        // Given
        given(userService.getUser()).willReturn(testUser);

        PersonalEventSearchRequest request = new PersonalEventSearchRequest(
            LocalDateTime.of(2025, 2, 2, 10, 0),
            LocalDateTime.of(2025, 2, 9, 10, 0)
        );

        PersonalEvent personalEvent1 = PersonalEvent.builder()
            .title("Meeting")
            .user(testUser)
            .startTime(LocalDateTime.of(2025, 2, 3, 16, 0))
            .endTime(LocalDateTime.of(2025, 2, 3, 18, 0))
            .build();

        PersonalEvent personalEvent2 = PersonalEvent.builder()
            .title("Meeting2")
            .user(testUser)
            .startTime(LocalDateTime.of(2025, 2, 5, 8, 0))
            .endTime(LocalDateTime.of(2025, 2, 5, 20, 0))
            .build();
        List<PersonalEvent> eventList = List.of(
            personalEvent1, personalEvent2
        );

        given(personalEventRepository.findByUserAndStartTimeBetween(testUser, request.startTime(),
            request.endTime())).willReturn(eventList);

        // When
        ListPersonalEventResponse response = personalEventService.listPersonalEvents(request);

        // Then
        assertThat(response.data().size()).isEqualTo(2);
    }

    @Test
    @DisplayName("개인 일정 생성 테스트")
    void testCreatePersonalEvent() {
        // given
        given(userService.getUser()).willReturn(testUser);

        PersonalEvent savedEvent = PersonalEvent.builder()
            .title(request.title())
            .startTime(request.startTime())
            .endTime(request.endTime())
            .user(testUser)
            .build();

        given(personalEventRepository.save(any(PersonalEvent.class))).willReturn(savedEvent);

        // when
        PersonalEventResponse response = personalEventService.createPersonalEvent(request);

        // then
        assertThat(response).isNotNull();
        assertThat(response.title()).isEqualTo(request.title());
        assertThat(response.startTime()).isEqualTo(startTime);

        verify(userService, times(1)).getUser();
        verify(personalEventRepository, times(1)).save(any(PersonalEvent.class));
    }

    @Test
    @DisplayName("개인 일정 업데이트 테스트")
    void testUpdatePersonalEvent_Success() {
        // given
        PersonalEvent existingEvent = PersonalEvent.builder()
            .title("Old Title")
            .startTime(startTime.minusHours(1))
            .endTime(endTime.minusHours(1))
            .user(testUser)
            .build();

        given(personalEventRepository.findById(anyLong())).willReturn(Optional.of(existingEvent));
        given(userService.getUser()).willReturn(testUser);

        // when
        PersonalEventResponse response = personalEventService.updatePersonalEvent(request, anyLong());

        // then
        assertThat(response).isNotNull();
        assertThat(response.title()).isEqualTo(request.title());

        then(personalEventRepository).should(times(1)).findById(anyLong());
        then(userService).should(times(1)).getUser();
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
        then(userService).should(never()).getUser();
    }

    @Test
    @DisplayName("개인 일정 업데이트 사용자 매칭 에러")
    void testUpdatePersonalEvent_Unauthorized() {
        // given
        User anotherUser = User.builder().name("anotherUser").email("another@email.com")
            .picture("another_picture").build();

        PersonalEvent existingEvent = PersonalEvent.builder()
            .title("Old Title")
            .startTime(startTime.minusHours(1))
            .endTime(endTime.minusHours(1))
            .user(anotherUser)
            .build();

        given(personalEventRepository.findById(anyLong())).willReturn(Optional.of(existingEvent));
        given(userService.getUser()).willReturn(testUser);

        // when & then
        assertThatThrownBy(() -> personalEventService.updatePersonalEvent(request, anyLong()))
            .isInstanceOf(RuntimeException.class);

        then(personalEventRepository).should(times(1)).findById(anyLong());
        then(userService).should(times(1)).getUser();
        then(personalEventRepository).should(never()).save(any(PersonalEvent.class));
    }

    @Test
    @DisplayName("개인 일정 삭제 사용자 매칭 에러")
    void testDeletePersonalEvent() {
        User anotherUser = User.builder().name("anotherUser").email("another@email.com")
            .picture("another_picture").build();

        PersonalEvent existingEvent = PersonalEvent.builder()
            .title("Old Title")
            .startTime(startTime.minusHours(1))
            .endTime(endTime.minusHours(1))
            .user(anotherUser)
            .build();
        given(personalEventRepository.findById(anyLong())).willReturn(Optional.of(existingEvent));
        given(userService.getUser()).willReturn(testUser);

        assertThatThrownBy(() -> personalEventService.deletePersonalEvent(anyLong()))
            .isInstanceOf(RuntimeException.class);

        then(personalEventRepository).should(times(1)).findById(anyLong());
        then(userService).should(times(1)).getUser();
        then(personalEventRepository).should(never()).save(any(PersonalEvent.class));
    }
}
