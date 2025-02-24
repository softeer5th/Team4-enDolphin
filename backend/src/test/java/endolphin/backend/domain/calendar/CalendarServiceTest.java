package endolphin.backend.domain.calendar;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import endolphin.backend.domain.calendar.entity.Calendar;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.error.exception.CalendarException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.google.dto.GoogleCalendarDto;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class CalendarServiceTest {

    @Mock
    private CalendarRepository calendarRepository;

    @InjectMocks
    private CalendarService calendarService;

    private User mockUser;
    private Calendar mockCalendar;

    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockCalendar = Calendar.builder()
            .calendarId("calendar-123")
            .user(mockUser)
            .name("Test Calendar")
            .description("Test Description")
            .build();
    }

    @Test
    @DisplayName("캘린더 생성 테스트")
    void createCalendar_ShouldSaveCalendar() {
        GoogleCalendarDto googleCalendarDto = new GoogleCalendarDto("calendar-123", "Test Calendar", "owner");

        calendarService.createCalendar(googleCalendarDto, mockUser);

        verify(calendarRepository, times(1)).save(any(Calendar.class));
    }

    @Test
    @DisplayName("SyncToken 조회 테스트")
    void getSyncToken_ShouldReturnSyncToken() {
        mockCalendar.setSyncToken("sync-token-123");
        when(calendarRepository.findByCalendarId("calendar-123")).thenReturn(Optional.of(mockCalendar));

        String syncToken = calendarService.getSyncToken("calendar-123");

        assertThat(syncToken).isEqualTo("sync-token-123");
    }

    @Test
    @DisplayName("SyncToken 조회 실패 테스트")
    void getSyncToken_ShouldThrowException_WhenCalendarNotFound() {
        when(calendarRepository.findByCalendarId("invalid-id")).thenReturn(Optional.empty());

        assertThrows(CalendarException.class, () -> calendarService.getSyncToken("invalid-id"));
    }

    @Test
    @DisplayName("Webhook 속성 설정 테스트")
    void setWebhookProperties_ShouldUpdateCalendar() {
        when(calendarRepository.findByCalendarId("calendar-123")).thenReturn(Optional.of(mockCalendar));

        calendarService.setWebhookProperties("calendar-123", "resource-1", "channel-1", "Mon, 10 Feb 2025 14:56:12 GMT");

        verify(calendarRepository, times(1)).save(any(Calendar.class));
        assertThat(mockCalendar.getResourceId()).isEqualTo("resource-1");
        assertThat(mockCalendar.getChannelId()).isEqualTo("channel-1");
    }

    @Test
    @DisplayName("SyncToken 업데이트 테스트")
    void updateSyncToken_ShouldUpdateToken() {
        when(calendarRepository.findByCalendarId("calendar-123")).thenReturn(Optional.of(mockCalendar));

        calendarService.updateSyncToken("calendar-123", "new-sync-token");

        verify(calendarRepository, times(1)).save(mockCalendar);
        assertThat(mockCalendar.getSyncToken()).isEqualTo("new-sync-token");
    }

    @Test
    @DisplayName("SyncToken 초기화 테스트")
    void clearSyncToken_ShouldClearToken() {
        mockCalendar.setSyncToken("existing-token");
        when(calendarRepository.findByCalendarId("calendar-123")).thenReturn(Optional.of(mockCalendar));

        calendarService.clearSyncToken("calendar-123");

        verify(calendarRepository, times(1)).save(mockCalendar);
        assertThat(mockCalendar.getSyncToken()).isNull();
    }

    @Test
    @DisplayName("캘린더 찾기 실패 테스트")
    void findByCalendarId_ShouldThrowException_WhenNotFound() {
        when(calendarRepository.findByCalendarId("invalid-id")).thenReturn(Optional.empty());

        assertThrows(CalendarException.class, () -> calendarService.updateSyncToken("invalid-id", "token"));
        assertThrows(CalendarException.class, () -> calendarService.clearSyncToken("invalid-id"));
        assertThrows(CalendarException.class, () -> calendarService.setWebhookProperties("invalid-id", "res", "chan", "Mon, 10 Feb 2025 14:56:12 GMT"));
    }
}
