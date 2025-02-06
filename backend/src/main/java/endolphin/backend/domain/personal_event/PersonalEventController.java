package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.personal_event.dto.PersonalEventRequest;
import endolphin.backend.domain.personal_event.dto.PersonalEventResponse;
import endolphin.backend.global.dto.ListResponse;
import endolphin.backend.global.error.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import endolphin.backend.global.util.URIUtil;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Tag(name = "Personal Event", description = "개인 일정 관리 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/personal-event")
public class PersonalEventController {

    private final PersonalEventService personalEventService;

    @Operation(summary = "개인 일정 조회", description = "사용자의 개인 일정을 주 단위로 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "일정 조회 성공",
            content = @Content(
                array = @ArraySchema(
                    schema = @Schema(implementation = PersonalEventResponse.class)))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청 파라미터",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping
    public ResponseEntity<ListResponse<PersonalEventResponse>> getPersonalEvents(
        @Valid @NotNull @RequestParam LocalDateTime startDateTime,
        @Valid @NotNull @RequestParam LocalDateTime endDateTime) {
        ListResponse<PersonalEventResponse> response = personalEventService.listPersonalEvents(
            startDateTime, endDateTime);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "개인 일정 생성", description = "새 일정을 추가합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "일정 생성 성공",
            content = @Content(schema = @Schema(implementation = PersonalEventResponse.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청 파라미터",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping
    public ResponseEntity<PersonalEventResponse> createPersonalEvent(
        @Valid @RequestBody PersonalEventRequest request) {
        PersonalEventResponse response = personalEventService.createPersonalEvent(request);
        URI location = URIUtil.buildResourceUri(response.id());
        return ResponseEntity.created(location).body(response);
    }

    @Operation(summary = "개인 일정 수정", description = "개인 일정을 수정합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "일정 수정 성공",
            content = @Content(schema = @Schema(implementation = PersonalEventResponse.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "404", description = "해당 일정 없음",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PutMapping("/{personalEventId}")
    public ResponseEntity<PersonalEventResponse> updatePersonalEvent(
        @Valid @RequestBody PersonalEventRequest request,
        @PathVariable("personalEventId") Long personalEventId) {
        PersonalEventResponse response = personalEventService.updatePersonalEvent(request,
            personalEventId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "개인 일정 삭제", description = "개인 일정을 삭제합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "일정 삭제 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "404", description = "해당 일정 없음",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @DeleteMapping("/{personalEventId}")
    public ResponseEntity<Void> deletePersonalEvent(
        @PathVariable("personalEventId") Long personalEventId) {
        personalEventService.deletePersonalEvent(personalEventId);
        return ResponseEntity.noContent().build();
    }
}
