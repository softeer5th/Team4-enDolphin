package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.personal_event.dto.ListPersonalEventResponse;
import endolphin.backend.domain.personal_event.dto.PersonalEventRequest;
import endolphin.backend.domain.personal_event.dto.PersonalEventResponse;
import endolphin.backend.domain.personal_event.dto.PersonalEventSearchRequest;
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

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/personal-event")
public class PersonalEventController {

    private final PersonalEventService personalEventService;

    @GetMapping("/")
    public ResponseEntity<ListPersonalEventResponse> getPersonalEvents(@RequestBody
        PersonalEventSearchRequest request) {
        ListPersonalEventResponse response = personalEventService.listPersonalEvents(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/")
    public ResponseEntity<PersonalEventResponse> createPersonalEvent(
        @RequestBody PersonalEventRequest request) {
        PersonalEventResponse response = personalEventService.createPersonalEvent(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{personalEventId}")
    public ResponseEntity<PersonalEventResponse> updatePersonalEvent(
        @RequestBody PersonalEventRequest request,
        @PathVariable("personalEventId") Long personalEventId) {
        PersonalEventResponse response = personalEventService.updatePersonalEvent(request,
            personalEventId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{personalEventId}")
    public ResponseEntity<PersonalEventResponse> deletePersonalEvent(
        @PathVariable("personalEventId") Long personalEventId) {
        personalEventService.deletePersonalEvent(personalEventId);
        return ResponseEntity.noContent().build();
    }
}
