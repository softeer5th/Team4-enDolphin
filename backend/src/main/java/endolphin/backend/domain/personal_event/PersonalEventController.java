package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.personal_event.dto.PersonalEventRequest;
import endolphin.backend.domain.personal_event.dto.PersonalEventResponse;
import endolphin.backend.domain.personal_event.dto.PersonalEventSearchRequest;
import endolphin.backend.global.dto.ListResponse;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/personal-event")
public class PersonalEventController {

    private final PersonalEventService personalEventService;

    @GetMapping("/")
    public ResponseEntity<ListResponse<PersonalEventResponse>> getPersonalEvents(@Valid @RequestBody
        PersonalEventSearchRequest request) {
        ListResponse<PersonalEventResponse> response = personalEventService.listPersonalEvents(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<PersonalEventResponse> createPersonalEvent(
        @Valid @RequestBody PersonalEventRequest request) {
        PersonalEventResponse response = personalEventService.createPersonalEvent(request);
        URI location = buildResourceUri(response.id());
        return ResponseEntity.created(location).body(response);
    }

    @PutMapping("/{personalEventId}")
    public ResponseEntity<PersonalEventResponse> updatePersonalEvent(
        @Valid @RequestBody PersonalEventRequest request,
        @PathVariable("personalEventId") Long personalEventId) {
        PersonalEventResponse response = personalEventService.updatePersonalEvent(request,
            personalEventId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{personalEventId}")
    public ResponseEntity<Void> deletePersonalEvent(
        @PathVariable("personalEventId") Long personalEventId) {
        personalEventService.deletePersonalEvent(personalEventId);
        return ResponseEntity.noContent().build();
    }

    private URI buildResourceUri(Object resourceId) {
        return ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(resourceId)
            .toUri();
    }
}
