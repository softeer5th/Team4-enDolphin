package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.personal_event.dto.PersonalEventRequest;
import endolphin.backend.domain.personal_event.dto.PersonalEventResponse;
import endolphin.backend.global.dto.ListResponse;
import io.swagger.v3.oas.annotations.Operation;
import endolphin.backend.global.util.URIUtil;
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
    @GetMapping
    public ResponseEntity<ListResponse<PersonalEventResponse>> getPersonalEvents(
        @Valid @NotNull @RequestParam LocalDateTime startDateTime,
        @Valid @NotNull @RequestParam LocalDateTime endDateTime) {
        ListResponse<PersonalEventResponse> response = personalEventService.listPersonalEvents(
            startDateTime, endDateTime);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "개인 일정 생성", description = "새 일정을 추가합니다.")
    @PostMapping
    public ResponseEntity<PersonalEventResponse> createPersonalEvent(
        @Valid @RequestBody PersonalEventRequest request) {
        PersonalEventResponse response = personalEventService.createPersonalEvent(request);
        URI location = URIUtil.buildResourceUri(response.id());
        return ResponseEntity.created(location).body(response);
    }

    @Operation(summary = "개인 일정 수정", description = "개인 일정을 수정합니다.")
    @PutMapping("/{personalEventId}")
    public ResponseEntity<PersonalEventResponse> updatePersonalEvent(
        @Valid @RequestBody PersonalEventRequest request,
        @PathVariable("personalEventId") Long personalEventId) {
        PersonalEventResponse response = personalEventService.updatePersonalEvent(request,
            personalEventId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "개인 일정 삭제", description = "개인 일정을 삭제합니다.")
    @DeleteMapping("/{personalEventId}")
    public ResponseEntity<Void> deletePersonalEvent(
        @PathVariable("personalEventId") Long personalEventId) {
        personalEventService.deletePersonalEvent(personalEventId);
        return ResponseEntity.noContent().build();
    }
}
