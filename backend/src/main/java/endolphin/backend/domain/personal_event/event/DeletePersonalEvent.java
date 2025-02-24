package endolphin.backend.domain.personal_event.event;

import endolphin.backend.domain.personal_event.entity.PersonalEvent;

public record DeletePersonalEvent(
    PersonalEvent personalEvent
) {

}
