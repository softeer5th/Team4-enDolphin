package endolphin.backend.domain.discussion;

import endolphin.backend.domain.discussion.dto.CreateDiscussionRequest;
import endolphin.backend.domain.discussion.dto.CreateDiscussionResponse;
import endolphin.backend.global.util.URIUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Discussion", description = "논의 관리 API")
@RestController
@RequestMapping("/api/v1/discussion")
@RequiredArgsConstructor
public class DiscussionController {

    private final DiscussionService discussionService;

    @Operation(summary = "논의 생성", description = "새 논의를 생성합니다.")
    @PostMapping
    public ResponseEntity<CreateDiscussionResponse> createDiscussion(
        @RequestBody @Valid CreateDiscussionRequest request) {
        CreateDiscussionResponse response = discussionService.createDiscussion(request);
        URI location = URIUtil.buildResourceUri(response.id());
        return ResponseEntity.created(location).body(response);
    }
}
