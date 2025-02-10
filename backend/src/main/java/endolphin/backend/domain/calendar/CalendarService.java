package endolphin.backend.domain.calendar;

import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.google.GoogleCalendarService;
import endolphin.backend.global.google.dto.GoogleCalendarDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CalendarService {

    private final CalendarRepository calendarRepository;
    private final GoogleCalendarService googleCalendarService;

    public void getAllEvents(GoogleCalendarDto calendar, User user) {
        //TODO 캘린더 DB에 저장

        googleCalendarService.getCalendarEvents(calendar.id(), user);

        //TODO personalEventService 호출해서 저장
    }

}
