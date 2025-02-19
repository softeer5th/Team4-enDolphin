package endolphin.backend.domain.personal_event.event.handler;

import endolphin.backend.domain.personal_event.PersonalEventService;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.google.dto.GoogleEvent;
import endolphin.backend.global.google.event.GoogleEventChanged;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PersonalEventHandler {
    private final PersonalEventService personalEventService;

    @EventListener(classes = {GoogleEventChanged.class})
    public void sync(GoogleEventChanged event) {
        List<GoogleEvent> events = event.events();
        User user = event.user();
        String googleCalendarId = event.googleCalendarId();
        personalEventService.syncWithGoogleEvents(events, user, googleCalendarId);
    }
}
