package endolphin.backend.global.google;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.never;

import endolphin.backend.domain.calendar.CalendarService;
import endolphin.backend.domain.calendar.entity.Calendar;
import endolphin.backend.domain.personal_event.PersonalEventService;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.config.GoogleCalendarUrl;
import endolphin.backend.global.google.dto.GoogleCalendarDto;
import endolphin.backend.global.google.dto.GoogleEvent;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class GoogleCalendarServiceTest {

    @Mock
    private CalendarService calendarService;

    @Mock
    private GoogleCalendarUrl googleCalendarUrl;

    @Mock
    private PersonalEventService personalEventService;

    // 테스트 대상 클래스. 내부의 getPrimaryCalendar(), getCalendarEvents()등을 spy를 통해 부분 모킹합니다.
    @Spy
    @InjectMocks
    private GoogleCalendarService googleCalendarService;

    @Test
    @DisplayName("사용자에게 캘린더가 이미 존재하고 구독 채널이 만료되지 않은 경우")
    void upsertGoogleCalendar_existingCalendar_validExpiration() {
        // Given
        User user = Mockito.mock(User.class);
        given(user.getId()).willReturn(1L);

        // 캘린더가 존재한다고 응답
        given(calendarService.isExistingCalendar(user.getId())).willReturn(true);

        // 채널 만료시간이 현재보다 이후인 캘린더를 리턴하도록 stub 처리
        Calendar calendar = Mockito.mock(Calendar.class);
        given(calendar.getChannelExpiration()).willReturn(LocalDateTime.now().plusDays(1));

        given(calendarService.getCalendarByUserId(eq(user.getId()))).willReturn(calendar);

        // When
        googleCalendarService.upsertGoogleCalendar(user);

        // Then
        then(calendarService).should().isExistingCalendar(user.getId());
        then(calendarService).should().getCalendarByUserId(user.getId());

        // 신규 캘린더 생성, 이벤트 동기화, 캘린더 채널 구독은 발생하지 않아야 합니다.
        then(googleCalendarService).should(never()).subscribeToCalendar(any(), any());
        then(calendarService).should(never()).createCalendar(any(), eq(user));
        then(personalEventService).should(never()).syncWithGoogleEvents(any(), eq(user), anyString());
    }

    @Test
    @DisplayName("사용자에게 캘린더가 존재하지 않을 경우")
    void upsertGoogleCalendar_noExistingCalendar() {
        // Given
        User user = Mockito.mock(User.class);
        given(user.getId()).willReturn(1L);

        // 캘린더가 존재하지 않다고 응답
        given(calendarService.isExistingCalendar(user.getId())).willReturn(false);

        // 내부 메서드 getPrimaryCalendar() 를 stub 처리하여 더미 GoogleCalendarDto 리턴
        GoogleCalendarDto googleCalendarDto = new GoogleCalendarDto("primary", "title", "test", "Asia/Seoul");

        doReturn(googleCalendarDto).when(googleCalendarService).getPrimaryCalendar(user);

        // 캘린더 생성시 stub 처리
        Calendar calendar = Mockito.mock(Calendar.class);
        given(calendar.getCalendarId()).willReturn("primary");
        given(calendarService.createCalendar(googleCalendarDto, user)).willReturn(calendar);

        // 내부 메서드 getCalendarEvents()도 stub 처리
        List<GoogleEvent> events = new ArrayList<>();
        // (필요하다면 더미 이벤트를 추가)
        doReturn(events).when(googleCalendarService).getCalendarEvents(googleCalendarDto.id(), user);
        doNothing().when(googleCalendarService).subscribeToCalendar(calendar, user);
        // When
        googleCalendarService.upsertGoogleCalendar(user);

        // Then
        then(calendarService).should().isExistingCalendar(user.getId());
        then(googleCalendarService).should().getPrimaryCalendar(user);
        then(calendarService).should().createCalendar(googleCalendarDto, user);
        then(googleCalendarService).should().getCalendarEvents(googleCalendarDto.id(), user);
        then(personalEventService).should().syncWithGoogleEvents(events, user, googleCalendarDto.id());
    }

    @Test
    @DisplayName("사용자에게 캘린더가 이미 존재하고 구독 채널이 만료된 경우")
    void upsertGoogleCalendar_existingCalendar_expired() {
        // Given
        User user = Mockito.mock(User.class);
        given(user.getId()).willReturn(1L);
        given(calendarService.isExistingCalendar(user.getId())).willReturn(true);
        Calendar calendar = Mockito.mock(Calendar.class);
        given(calendar.getChannelExpiration()).willReturn(LocalDateTime.now().minusDays(1));
        given(calendarService.getCalendarByUserId(user.getId())).willReturn(calendar);

        doNothing().when(googleCalendarService).subscribeToCalendar(calendar, user);
        // When
        googleCalendarService.upsertGoogleCalendar(user);

        // Then
        then(calendarService).should().isExistingCalendar(user.getId());
        then(calendarService).should().getCalendarByUserId(user.getId());
        // 만료된 캘린더의 경우, 아무런 추가 작업도 하지 않아야 합니다.
        then(calendarService).should(never()).createCalendar(any(), eq(user));
        then(personalEventService).should(never()).syncWithGoogleEvents(any(), eq(user), anyString());
    }
}