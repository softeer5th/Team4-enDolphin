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
        Long offset = discussionParticipantRepository.findMaxOffsetByDiscussionId(
            discussion.getId());

        offset += 1;

        if (offset >= 15) {
            throw new ApiException(ErrorCode.DISCUSSION_PARTICIPANT_EXCEED_LIMIT);
        }

        DiscussionParticipant participant;
        if (offset == 0) {
            participant = DiscussionParticipant.builder()
                .discussion(discussion)
                .user(user)
                .isHost(true)
                .userOffset(offset)
                .build();
        } else {
            participant = DiscussionParticipant.builder()
                .discussion(discussion)
                .user(user)
                .isHost(false)
                .userOffset(offset)
                .build();
        }
        discussionParticipantRepository.save(participant);
    }

    @Transactional(readOnly = true)
    public List<User> getUsersByDiscussionId(Long discussionId) {
        return discussionParticipantRepository.findUsersByDiscussionId(discussionId);
    }

    @Transactional(readOnly = true)
    public Long getDiscussionParticipantOffset(Long discussionId, Long userId) {
        return discussionParticipantRepository.findOffsetByDiscussionIdAndUserId(discussionId,
                userId)
            .orElseThrow(() -> new ApiException(ErrorCode.DISCUSSION_PARTICIPANT_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public int getFilter(Long discussionId, List<Long> userIds) {
        List<Long> userOffsets = discussionParticipantRepository.findOffsetsByDiscussionIdAndUserIds(
            discussionId, userIds);

        int filter = 0;

        for (Long offset : userOffsets) {
            filter |= (1 << 15 - offset);
        }

        return filter;
    }
}
