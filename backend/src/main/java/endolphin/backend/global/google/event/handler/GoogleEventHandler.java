package endolphin.backend.global.google.event.handler;

import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.personal_event.event.DeletePersonalEvent;
import endolphin.backend.domain.personal_event.event.UpdatePersonalEvent;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.domain.user.event.LoginEvent;
import endolphin.backend.global.google.GoogleCalendarService;
import endolphin.backend.domain.personal_event.event.InsertPersonalEvent;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class GoogleEventHandler {
    private final GoogleCalendarService googleCalendarService;

    @Async
    @TransactionalEventListener(classes = {InsertPersonalEvent.class})
    public void insert(InsertPersonalEvent event) {
        List<PersonalEvent> personalEventList =
            event.personalEventList();
        googleCalendarService.insertPersonalEvents(personalEventList);
    }

    @Async
    @TransactionalEventListener(classes = {LoginEvent.class})
    public void login(LoginEvent event) {
        User user = event.user();
        googleCalendarService.upsertGoogleCalendar(user);
    }

    @Async
    @TransactionalEventListener(classes = {UpdatePersonalEvent.class})
    public void update(UpdatePersonalEvent event) {
        googleCalendarService.updatePersonalEventToGoogleCalendar(event.personalEvent());
    }

    @Async
    @TransactionalEventListener(classes = {DeletePersonalEvent.class})
    public void delete(DeletePersonalEvent event) {
        googleCalendarService.deletePersonalEventFromGoogleCalender(event.personalEvent());
    }
}
