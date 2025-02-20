package endolphin.backend.global.sse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Tag(name = "SSE", description = "Server-Sent Events")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/sse/events")
public class CalendarEventController {

    private final SseEmitters emitters;

    @Operation(summary = "구독", description = "사용자의 캘린더 이벤트를 구독합니다.")
    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@RequestParam("userId") Long userId) {
        return emitters.add(userId);
    }
}