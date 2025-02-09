package endolphin.backend.domain.shared_event.dto;

import java.util.List;

public record SharedEventWithDiscussionInfoResponse(
    Long discussionId,
    String title,
    String meetingMethodOrLocation,
    SharedEventDto sharedEventDto,
    List<String> participantPictureUrls) {

}
