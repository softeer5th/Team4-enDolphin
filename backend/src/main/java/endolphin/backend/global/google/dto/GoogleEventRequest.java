package endolphin.backend.global.google.dto;

import endolphin.backend.domain.personal_event.entity.PersonalEvent;

public record GoogleEventRequest(
    GoogleEventDateTime start,
    GoogleEventDateTime end,
    String summary,
    String id
) {

    public static GoogleEventRequest of(PersonalEvent personalEvent, String id) {
        GoogleEventDateTime start = GoogleEventDateTime.fromLocalDateTime(personalEvent.getStartTime());
        GoogleEventDateTime end = GoogleEventDateTime.fromLocalDateTime(personalEvent.getEndTime());
        return new GoogleEventRequest(start, end, personalEvent.getTitle(), id);
    }

}
