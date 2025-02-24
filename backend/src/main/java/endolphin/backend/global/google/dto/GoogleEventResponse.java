package endolphin.backend.global.google.dto;

import java.util.List;

public record GoogleEventResponse(
    List<EventItem> items,
    String nextSyncToken,
    String nextPageToken
) {

}
