package endolphin.backend.global.sse;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class SseEmitters {

    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();
    private static final Long TIMEOUT = 1000L * 60 * 30;

    public SseEmitter add(Long userId) {
        SseEmitter emitter = new SseEmitter(TIMEOUT);
        log.info("User {} connected", userId);

        emitter.onCompletion(() -> emitters.remove(userId));
        emitter.onTimeout(() -> emitters.remove(userId));

        emitters.put(userId, emitter);

        try {
            emitter.send(SseEmitter.event().comment("connected"));
            log.info("Dummy Data sent to User {}", userId);
        } catch (IOException e) {
            emitters.remove(userId);
        }

        return emitter;
    }

    public void sendToUser(Long userId, Object data) {
        SseEmitter emitter = emitters.get(userId);
        if (emitter != null) {
            try {
                log.info("Data {} sent to User {}", data, userId);
                emitter.send(SseEmitter.event().data(data));
            } catch (IOException e) {
                emitters.remove(userId);
            }
        }
    }
}

