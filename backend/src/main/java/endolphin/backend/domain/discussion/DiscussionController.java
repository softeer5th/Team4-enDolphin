package endolphin.backend.domain.discussion;

import endolphin.backend.domain.discussion.dto.CreateDiscussionRequest;
import endolphin.backend.domain.discussion.dto.CreateDiscussionResponse;
import endolphin.backend.domain.shared_event.dto.SharedEventRequest;
import endolphin.backend.domain.shared_event.dto.SharedEventWithDiscussionInfoResponse;
import endolphin.backend.global.error.ErrorResponse;
import endolphin.backend.global.util.URIUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "논의 생성 성공",
            content = @Content(schema = @Schema(implementation = CreateDiscussionResponse.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청 파라미터",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping
    public ResponseEntity<CreateDiscussionResponse> createDiscussion(
        @RequestBody @Valid CreateDiscussionRequest request) {
        CreateDiscussionResponse response = discussionService.createDiscussion(request);
        URI location = URIUtil.buildResourceUri(response.id());
        return ResponseEntity.created(location).body(response);
    }

    @Operation(summary = "논의 확정", description = "후보 일정을 해당 논의의 공유 일정으로 확정합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "논의 확정 성공",
            content = @Content(schema = @Schema(implementation = SharedEventWithDiscussionInfoResponse.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청 파라미터",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/{discussionId}/confirm")
    public ResponseEntity<SharedEventWithDiscussionInfoResponse> confirmSchedule(
        @PathVariable Long discussionId,
        @Valid @RequestBody SharedEventRequest request) {

        SharedEventWithDiscussionInfoResponse response = discussionService.confirmSchedule(discussionId, request);
        return ResponseEntity.ok(response);
    }
}
