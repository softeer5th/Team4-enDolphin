package endolphin.backend.global.google.dto;

public record WatchResponse(
    String kind,
    String id,
    String resourceId,
    String resourceUri,
    String token,
    String expiration
) {

}
