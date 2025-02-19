package endolphin.backend.global.google.event;

import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.google.dto.GoogleEvent;
import java.util.List;

public record GoogleEventChanged(
    List<GoogleEvent> events,
    User user,
    String googleCalendarId
) {

}
