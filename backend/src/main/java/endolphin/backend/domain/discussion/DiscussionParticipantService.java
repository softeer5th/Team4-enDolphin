package endolphin.backend.domain.discussion;

import endolphin.backend.domain.discussion.dto.DiscussionParticipantsResponse;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.entity.DiscussionParticipant;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.dto.UserIdNameDto;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class DiscussionParticipantService {

    private final DiscussionParticipantRepository discussionParticipantRepository;
    private final UserService userService;

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

        if (userIds == null || userIds.isEmpty()) {
            return 0;
        }

        List<Long> userOffsets = discussionParticipantRepository.findOffsetsByDiscussionIdAndUserIds(
            discussionId, userIds);

        int filter = 0;

        for (Long offset : userOffsets) {
            filter |= (1 << 15 - offset);
        }

        return filter;
    }

    @Transactional(readOnly = true)
    public List<UserIdNameDto> getUsersFromData(Long discussionId, int data) {
        if (data == 0) {
            return new ArrayList<>();
        }

        List<Long> userOffsets = new ArrayList<>();

        for (int i = 0; i < 16; i++) {
            if ((data & (1 << (15 - i))) != 0) {
                userOffsets.add((long) i);
            }
        }

        List<Long> userIds = discussionParticipantRepository.findUserIdsByDiscussionIdAndOffset(
            discussionId, userOffsets);

        return userService.getUserIdNameInIds(userIds);
    }

    @Transactional(readOnly = true)
    public List<Discussion> getDiscussionsByUserId(Long userId) {
        return discussionParticipantRepository.findDiscussionsByUserId(userId);
    }

    @Transactional(readOnly = true)
    public DiscussionParticipantsResponse getDiscussionParticipants(Long discussionId) {
        List<UserIdNameDto> participants = discussionParticipantRepository.findUserIdNameDtosByDiscussionId(
            discussionId);

        if(participants.isEmpty()) {
            throw new ApiException(ErrorCode.DISCUSSION_PARTICIPANT_NOT_FOUND);
        }
        return new DiscussionParticipantsResponse(participants);
    }

    @Transactional(readOnly = true)
    public Boolean amIHost(Long discussionId) {
        User user = userService.getCurrentUser();
        return discussionParticipantRepository.findIsHostByDiscussionIdAndUserId(discussionId, user.getId())
            .orElseThrow(() -> new ApiException(ErrorCode.DISCUSSION_PARTICIPANT_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public String getHostNameByDiscussionId(Long discussionId) {
        return discussionParticipantRepository.findHostNameByDiscussionIdAndIsHost(discussionId)
            .orElseThrow(() -> new ApiException(ErrorCode.DISCUSSION_HOST_NOT_FOUND));
    }

    public Boolean isFull(Long discussionId) {
        Long offset = discussionParticipantRepository.findMaxOffsetByDiscussionId(discussionId);
        return offset >= 14;
    }
}
