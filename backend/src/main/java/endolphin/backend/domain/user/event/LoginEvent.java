package endolphin.backend.domain.user.event;

import endolphin.backend.domain.user.entity.User;

public record LoginEvent(
    User user
) {

}
