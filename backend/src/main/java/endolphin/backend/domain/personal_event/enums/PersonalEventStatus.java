package endolphin.backend.domain.personal_event.enums;

import lombok.Getter;

@Getter
public enum PersonalEventStatus {
    ADJUSTABLE("adjustable"),
    FIXED("fixed"),
    OUT_OF_RANGE("outOfRange");

    private final String value;

    PersonalEventStatus(String value) {
        this.value = value;
    }
}
