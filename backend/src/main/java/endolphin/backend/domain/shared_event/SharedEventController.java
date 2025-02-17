package endolphin.backend.domain.shared_event;

import endolphin.backend.domain.discussion.DiscussionService;
import endolphin.backend.domain.discussion.dto.OngoingDiscussion;
import endolphin.backend.domain.discussion.dto.OngoingDiscussionsResponse;
import endolphin.backend.domain.discussion.enums.AttendType;
import endolphin.backend.global.error.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Main View", description = "메인 뷰 API")
@RestController
@RequestMapping("/api/v1/schedules")
@RequiredArgsConstructor
public class SharedEventController {

    private final DiscussionService discussionService;

    @Operation(summary = "진행 중인 논의 조회", description = "진행 중인 논의를 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "논의 조회 성공",
            content = @Content(schema = @Schema(implementation = OngoingDiscussionsResponse.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청 파라미터",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/ongoing")
    public ResponseEntity<OngoingDiscussionsResponse> getOngoingDiscussion(
        @Min(1) @RequestParam int page,
        @Min(1) @RequestParam int size,
        @RequestParam AttendType attendType
    ) {
        return ResponseEntity.ok(discussionService.getOngoingDiscussions(page, size, attendType));
    }

}
