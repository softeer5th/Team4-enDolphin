package endolphin.backend.global.google.enums;

import lombok.Getter;

@Getter
public enum GoogleResourceState {
    SYNC("sync"),
    EXISTS("exists");

    private final String value;

    GoogleResourceState(String value) {
        this.value = value;
    }
}
