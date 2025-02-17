package endolphin.backend.domain.discussion;

import endolphin.backend.domain.discussion.dto.DiscussionParticipantsResponse;
import endolphin.backend.domain.discussion.dto.FinishedDiscussionResponse;
import endolphin.backend.domain.discussion.dto.OngoingDiscussion;
import endolphin.backend.domain.discussion.dto.OngoingDiscussionsResponse;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.entity.DiscussionParticipant;
import endolphin.backend.domain.shared_event.SharedEventService;
import endolphin.backend.domain.shared_event.dto.SharedEventDto;
import endolphin.backend.domain.shared_event.dto.SharedEventWithDiscussionInfoResponse;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.dto.UserIdNameDto;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import endolphin.backend.global.util.TimeCalculator;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class DiscussionParticipantService {

    private final DiscussionParticipantRepository discussionParticipantRepository;
    private final UserService userService;
    private static final int MAX_PARTICIPANT = 15;
    private final SharedEventService sharedEventService;

    public void addDiscussionParticipant(Discussion discussion, User user) {
        Long offset = discussionParticipantRepository.findMaxOffsetByDiscussionId(
            discussion.getId());

        offset += 1;

        if (offset >= MAX_PARTICIPANT) {
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
            filter |= (1 << MAX_PARTICIPANT - offset);
        }

        return filter;
    }

    @Transactional(readOnly = true)
    public List<UserIdNameDto> getUsersFromData(Long discussionId, int data) {
        if (data == 0) {
            return new ArrayList<>();
        }

        List<Long> userOffsets = new ArrayList<>();

        for (int i = 0; i < MAX_PARTICIPANT + 1; i++) {
            if ((data & (1 << (MAX_PARTICIPANT - i))) != 0) {
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

        if (participants.isEmpty()) {
            throw new ApiException(ErrorCode.DISCUSSION_PARTICIPANT_NOT_FOUND);
        }
        return new DiscussionParticipantsResponse(participants);
    }

    @Transactional(readOnly = true)
    public OngoingDiscussionsResponse getOngoingDiscussions(Long userId, int page, int size,
        Boolean isHost) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Discussion> discussionPage = discussionParticipantRepository.findOngoingDiscussions(
            userId, isHost, pageable);
        List<Discussion> discussions = discussionPage.getContent();

        List<Long> discussionIds = discussions.stream()
            .map(Discussion::getId)
            .collect(Collectors.toList());

        Map<Long, List<String>> discussionPicturesMap = getDiscussionPicturesMap(discussionIds);

        List<OngoingDiscussion> ongoingDiscussions = discussions.stream()
            .map(discussion -> new OngoingDiscussion(
                discussion.getId(),
                discussion.getTitle(),
                discussion.getDateRangeStart(),
                discussion.getDateRangeEnd(),
                TimeCalculator.calculateTimeLeft(discussion.getDeadline()),
                discussionPicturesMap.getOrDefault(discussion.getId(), Collections.emptyList())
            ))
            .collect(Collectors.toList());

        return new OngoingDiscussionsResponse(
            page + 1,
            discussionPage.getTotalPages(),
            discussionPage.hasNext(),
            discussionPage.hasPrevious(),
            ongoingDiscussions);
    }

    @Transactional(readOnly = true)
    public FinishedDiscussionResponse getFinishedDiscussions(Long userId, int page, int size,
        int year) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Discussion> discussionPage = discussionParticipantRepository.findFinishedDiscussions(
            userId, pageable, year);

        List<Discussion> discussions = discussionPage.getContent();

        List<Long> discussionIds = discussions.stream()
            .map(Discussion::getId)
            .collect(Collectors.toList());

        Map<Long, List<String>> discussionPicturesMap = getDiscussionPicturesMap(discussionIds);

        Map<Long, SharedEventDto> sharedEventMap = sharedEventService.getSharedEventMap(
            discussionIds);

        List<SharedEventWithDiscussionInfoResponse> finishedDiscussions = discussions.stream()
            .map(discussion -> new SharedEventWithDiscussionInfoResponse(
                discussion.getId(),
                discussion.getTitle(),
                discussion.getMeetingMethodOrLocation(),
                sharedEventMap.getOrDefault(discussion.getId(), null),
                discussionPicturesMap.getOrDefault(discussion.getId(), Collections.emptyList())
            ))
            .collect(Collectors.toList());

        return new FinishedDiscussionResponse(
            year,
            page + 1,
            discussionPage.getTotalPages(),
            discussionPage.hasNext(),
            discussionPage.hasPrevious(),
            finishedDiscussions);
    }

    @Transactional(readOnly = true)
    protected Map<Long, List<String>> getDiscussionPicturesMap(List<Long> discussionIds) {
        List<Object[]> pictureResults = discussionParticipantRepository.findUserPicturesByDiscussionIds(
            discussionIds);

        return pictureResults.stream()
            .collect(Collectors.groupingBy(
                result -> (Long) result[0],
                Collectors.mapping(result -> (String) result[1], Collectors.toList())
            ));
    }

    @Transactional(readOnly = true)
    public Boolean amIHost(Long discussionId) {
        User user = userService.getCurrentUser();
        return discussionParticipantRepository.findIsHostByDiscussionIdAndUserId(discussionId,
                user.getId())
            .orElseThrow(() -> new ApiException(ErrorCode.DISCUSSION_PARTICIPANT_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public String getHostNameByDiscussionId(Long discussionId) {
        return discussionParticipantRepository.findHostNameByDiscussionIdAndIsHost(discussionId)
            .orElseThrow(() -> new ApiException(ErrorCode.DISCUSSION_HOST_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Boolean isFull(Long discussionId) {
        Long offset = discussionParticipantRepository.findMaxOffsetByDiscussionId(discussionId);
        return offset >= MAX_PARTICIPANT - 1;
    }
}
