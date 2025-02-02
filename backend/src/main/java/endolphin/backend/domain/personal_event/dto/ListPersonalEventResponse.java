package endolphin.backend.domain.personal_event.dto;

import java.util.List;

public record ListPersonalEventResponse(
    List<PersonalEventResponse> data
) {

}
