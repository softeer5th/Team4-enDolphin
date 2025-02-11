package endolphin.backend.domain.calendar;

import endolphin.backend.domain.calendar.entity.Calendar;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.error.exception.CalendarException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.google.dto.GoogleCalendarDto;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CalendarService {

    private final CalendarRepository calendarRepository;

    public void createCalendar(GoogleCalendarDto calendar, User user) {
        Calendar newCalendar = Calendar.builder()
            .calendarId(calendar.id())
            .user(user)
            .name(calendar.summary())
            .description(calendar.description())
            .build();
        calendarRepository.save(newCalendar);
    }

    @Transactional(readOnly = true)
    public String getSyncToken(String calendarId) {
        Calendar calendar = calendarRepository.findByCalendarId(calendarId).orElseThrow(
            () -> new CalendarException(ErrorCode.CALENDAR_NOT_FOUND_ERROR));
        return calendar.getSyncToken();
    }

    public void setWebhookProperties(String calendarId, String resourceId, String channelId,
        String expiration) {
        Calendar calendar = calendarRepository.findByCalendarId(calendarId).orElseThrow(
            () -> new CalendarException(ErrorCode.CALENDAR_NOT_FOUND_ERROR));

        DateTimeFormatter formatter = DateTimeFormatter.RFC_1123_DATE_TIME;

        ZonedDateTime zonedDateTime = ZonedDateTime.parse(expiration, formatter);
        LocalDateTime expirationDateTime = zonedDateTime
            .withZoneSameInstant(ZoneId.of("Asia/Seoul"))
            .toLocalDateTime();

        calendar.setWebhookProperties(resourceId, channelId, expirationDateTime);
        calendarRepository.save(calendar);
    }

    public void updateSyncToken(String calendarId, String newSyncToken) {
        Calendar calendar = calendarRepository.findByCalendarId(calendarId).orElseThrow(
            () -> new CalendarException(ErrorCode.CALENDAR_NOT_FOUND_ERROR));
        calendar.setSyncToken(newSyncToken);
        calendarRepository.save(calendar);
    }

    public void clearSyncToken(String calendarId) {
        Calendar calendar = calendarRepository.findByCalendarId(calendarId).orElseThrow(
            () -> new CalendarException(ErrorCode.CALENDAR_NOT_FOUND_ERROR));
        calendar.setSyncToken(null);
        calendarRepository.save(calendar);
    }

    public boolean isExistingCalendar(Long userId) {
        return calendarRepository.existsByUserId(userId);
    }

    public Calendar getCalendarByUserId(Long userId) {
        return calendarRepository.findByUserId(userId).orElseThrow(
            () -> new CalendarException(ErrorCode.CALENDAR_NOT_FOUND_ERROR));
    }

}
