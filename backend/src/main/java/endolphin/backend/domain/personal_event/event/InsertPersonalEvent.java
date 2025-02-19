package endolphin.backend.domain.personal_event.event;

import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import java.util.List;

public record InsertPersonalEvent(
    List<PersonalEvent> personalEventList
) {

}
