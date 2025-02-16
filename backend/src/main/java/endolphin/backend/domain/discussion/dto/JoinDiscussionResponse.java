package endolphin.backend.domain.discussion.dto;

public record JoinDiscussionResponse(
    boolean isSuccess,
    int failedCount
) {

}
