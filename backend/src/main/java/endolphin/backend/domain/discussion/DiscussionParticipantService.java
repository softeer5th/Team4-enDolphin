package endolphin.backend.domain.discussion;

import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.entity.DiscussionParticipant;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
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
        Long index = discussionParticipantRepository.findMaxIndexByDiscussionId(discussion.getId())
            .orElseThrow(() -> new ApiException(ErrorCode.DISCUSSION_NOT_FOUND));
        index += 1;
        DiscussionParticipant participant;
        if (index == 0) {
            participant = DiscussionParticipant.builder()
                .discussion(discussion)
                .user(user)
                .isHost(true)
                .index(index)
                .build();
        } else {
            participant = DiscussionParticipant.builder()
                .discussion(discussion)
                .user(user)
                .isHost(false)
                .index(index)
                .build();
        }
        discussionParticipantRepository.save(participant);
    }

    @Transactional(readOnly = true)
    public List<User> getUsersByDiscussionId(Long discussionId){
        return discussionParticipantRepository.findUsersByDiscussionId(discussionId);
    }

    @Transactional(readOnly = true)
    public Long getDiscussionParticipantIndex(Long discussionId, Long userId) {
        return discussionParticipantRepository.findIndexByDiscussionIdAndUserId(discussionId, userId)
            .orElseThrow(() -> new ApiException(ErrorCode.DISCUSSION_PARTICIPANT_NOT_FOUND));
    }
}
