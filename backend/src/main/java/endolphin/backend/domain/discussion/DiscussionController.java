package endolphin.backend.domain.discussion;

import endolphin.backend.domain.discussion.dto.CreateDiscussionRequest;
import endolphin.backend.domain.discussion.dto.CreateDiscussionResponse;
import endolphin.backend.global.util.URIUtil;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/discussion")
@RequiredArgsConstructor
public class DiscussionController {

    private final DiscussionService discussionService;

    @PostMapping
    public ResponseEntity<CreateDiscussionResponse> createDiscussion(
        @RequestBody @Valid CreateDiscussionRequest request) {
        CreateDiscussionResponse response = discussionService.createDiscussion(request);
        URI location = URIUtil.buildResourceUri(response.id());
        return ResponseEntity.created(location).body(response);
    }
}
