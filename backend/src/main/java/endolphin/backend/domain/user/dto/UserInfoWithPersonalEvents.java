package endolphin.backend.domain.user.dto;

import endolphin.backend.domain.personal_event.dto.PersonalEventWithStatus;
import java.util.List;

public record UserInfoWithPersonalEvents(
    Long id,
    String name,
    String picture,
    boolean selected,
    List<PersonalEventWithStatus> events
) {

}
