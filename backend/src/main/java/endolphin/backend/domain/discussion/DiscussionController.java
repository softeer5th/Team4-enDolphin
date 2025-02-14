package endolphin.backend.domain.discussion;

import endolphin.backend.domain.candidate_event.CandidateEventService;
import endolphin.backend.domain.candidate_event.dto.CalendarViewRequest;
import endolphin.backend.domain.candidate_event.dto.CalendarViewResponse;
import endolphin.backend.domain.candidate_event.dto.RankViewRequest;
import endolphin.backend.domain.candidate_event.dto.RankViewResponse;
import endolphin.backend.domain.discussion.dto.CandidateEventDetailsRequest;
import endolphin.backend.domain.discussion.dto.CandidateEventDetailsResponse;
import endolphin.backend.domain.discussion.dto.CreateDiscussionRequest;
import endolphin.backend.domain.discussion.dto.DiscussionInfo;
import endolphin.backend.domain.discussion.dto.DiscussionParticipantsResponse;
import endolphin.backend.domain.discussion.dto.DiscussionResponse;
import endolphin.backend.domain.discussion.dto.InvitationInfo;
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
import jakarta.validation.constraints.Min;
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
    private final DiscussionParticipantService discussionParticipantService;
    private final CandidateEventService candidateEventService;

    @Operation(summary = "논의 생성", description = "새 논의를 생성합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "논의 생성 성공",
            content = @Content(schema = @Schema(implementation = DiscussionResponse.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청 파라미터",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping
    public ResponseEntity<DiscussionResponse> createDiscussion(
        @RequestBody @Valid CreateDiscussionRequest request) {
        DiscussionResponse response = discussionService.createDiscussion(request);
        URI location = URIUtil.buildResourceUri(response.id());
        return ResponseEntity.created(location).body(response);
    }

    @Operation(summary = "논의 정보 조회", description = "논의 정보를 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "논의 정보 조회 성공",
            content = @Content(schema = @Schema(implementation = DiscussionInfo.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청 파라미터",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "404", description = "해당 논의 없음",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/{discussionId}")
    public ResponseEntity<DiscussionInfo> getDiscussionInfo(
        @PathVariable @Min(1) Long discussionId) {
        DiscussionInfo discussionInfo = discussionService.getDiscussionInfo(discussionId);
        return ResponseEntity.ok(discussionInfo);
    }

    @Operation(summary = "초대장 정보 조회", description = "논의 초대장 정보를 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "초대장 정보 조회 성공",
            content = @Content(schema = @Schema(implementation = InvitationInfo.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청 파라미터",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "404", description = "해당 논의 없음",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/{discussionId}/invite")
    public ResponseEntity<InvitationInfo> getInvitationInfo(
        @PathVariable @Min(1) Long discussionId) {
        InvitationInfo invitationInfo = discussionService.getInvitationInfo(discussionId);
        return ResponseEntity.ok(invitationInfo);
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
        @PathVariable @Min(1) Long discussionId,
        @Valid @RequestBody SharedEventRequest request) {

        SharedEventWithDiscussionInfoResponse response = discussionService.confirmSchedule(
            discussionId, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "후보 일정 캘린더 뷰", description = "후보 일정을 캘린더 뷰로 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "후보 일정 조회 성공",
            content = @Content(schema = @Schema(implementation = CalendarViewResponse.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청 파라미터",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/{discussionId}/candidate-event/calendar")
    public ResponseEntity<CalendarViewResponse> getCandidateEventsForCalendarView(
        @PathVariable @Min(1) Long discussionId,
        @Valid @RequestBody CalendarViewRequest request) {

        CalendarViewResponse response = candidateEventService.getEventsOnCalendarView(discussionId,
            request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "후보 일정 랭크 뷰", description = "후보 일정을 랭크 뷰로 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "후보 일정 조회 성공",
            content = @Content(schema = @Schema(implementation = RankViewResponse.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청 파라미터",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/{discussionId}/candidate-event/rank")
    public ResponseEntity<RankViewResponse> getCandidateEventsForRankView(
        @PathVariable @Min(1) Long discussionId,
        @Valid @RequestBody RankViewRequest request) {

        RankViewResponse response = candidateEventService.getEventsOnRankView(discussionId,
            request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "논의 참가", description = "논의에 참가합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "참가 성공",
            content = @Content(schema = @Schema(implementation = Boolean.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청 파라미터",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "403", description = "비밀번호 인증 5회 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "404", description = "해당 논의 없음",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/{discussionId}/join")
    public ResponseEntity<Boolean> joinInDiscussion(@PathVariable @Min(1) Long discussionId,
        @RequestBody String password) {
        Boolean isSuccess = discussionService.joinDiscussion(discussionId, password);
        return ResponseEntity.ok(isSuccess);
    }

    @Operation(summary = "후보 일정 상세 정보", description = "후보 일정의 상세 정보를 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "후보 일정 상세 정보 조회 성공",
            content = @Content(schema = @Schema(implementation = CandidateEventDetailsResponse.class)))
    })
    @PostMapping("/{discussionId}/candidate-event/details")
    public ResponseEntity<CandidateEventDetailsResponse> getCandidateEventDetails(
        @PathVariable("discussionId") @Min(1) Long discussionId,
        @Valid @RequestBody CandidateEventDetailsRequest request) {
        CandidateEventDetailsResponse response = discussionService.retrieveCandidateEventDetails(
            discussionId, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "논의 참여자 조회", description = "해당 논의의 참여자 목록을 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "참여자 목록 조회 성공",
            content = @Content(schema = @Schema(implementation = DiscussionParticipantsResponse.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청 파라미터",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "404", description = "논의 참여자 없음",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/{discussionId}/participants")
    public ResponseEntity<DiscussionParticipantsResponse> getDiscussionParticipants(
        @PathVariable("discussionId") @Min(1) Long discussionId) {
        return ResponseEntity.ok(
            discussionParticipantService.getDiscussionParticipants(discussionId));
    }

    @Operation(summary = "내가 호스트인가요?", description = "현재 사용자가 논의의 호스트인지 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "호스트 여부 조회 성공",
            content = @Content(schema = @Schema(implementation = Boolean.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청 파라미터",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "404", description = "논의 참여자 없음",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/{discussionId}/role")
    public ResponseEntity<Boolean> amIHost(
        @PathVariable("discussionId") @Min(1) Long discussionId) {
        return ResponseEntity.ok(discussionParticipantService.amIHost(discussionId));
    }
}
