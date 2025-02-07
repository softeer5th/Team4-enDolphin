package endolphin.backend.domain.personal_event;

import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersonalEventPreprocessor {

    @Async
    public void preprocess(List<PersonalEvent> personalEvents) {

    }
}
