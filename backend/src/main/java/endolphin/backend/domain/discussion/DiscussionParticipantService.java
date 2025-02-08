package endolphin.backend.domain.discussion;

import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.entity.DiscussionParticipant;
import endolphin.backend.domain.user.entity.User;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class DiscussionParticipantService {

    private final DiscussionParticipantRepository discussionParticipantRepository;

    public void addDiscussionParticipant(Discussion discussion, User user) {
        DiscussionParticipant participant = DiscussionParticipant.builder()
            .discussion(discussion)
            .user(user)
            .isHost(true) // TODO 전처리 진행하실때 user index 관련 로직으로 변경해주시면 감사하겠습니다.
            .build();
        discussionParticipantRepository.save(participant);
    }

    @Transactional(readOnly = true)
    public List<User> getUsersByDiscussionId(Long discussionId){
        return discussionParticipantRepository.findUsersByDiscussionId(discussionId);
    }
}
