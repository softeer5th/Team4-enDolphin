package endolphin.backend.global.google.dto;

public record EventItem(
    String id,
    String summary,
    String status,
    EventTime start,
    EventTime end
) {

}
