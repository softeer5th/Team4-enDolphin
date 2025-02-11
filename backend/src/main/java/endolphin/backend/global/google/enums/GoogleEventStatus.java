package endolphin.backend.global.google.enums;

import lombok.Getter;

@Getter
public enum GoogleEventStatus {
    CONFIRMED("confirmed"),
    CANCELLED("cancelled"),
    TENTATIVE("tentative");

    private final String value;
    GoogleEventStatus(String value) {
        this.value = value;
    }

    public static GoogleEventStatus fromValue(String value) {
        String lowerCaseValue = value.toLowerCase();
        for (GoogleEventStatus state : GoogleEventStatus.values()) {
            if (state.getValue().equals(lowerCaseValue)) {
                return state;
            }
        }
        return CONFIRMED;
    }
}
