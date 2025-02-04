package endolphin.backend.domain.discussion;

import endolphin.backend.domain.discussion.dto.CreateDiscussionRequest;
import endolphin.backend.domain.discussion.dto.CreateDiscussionResponse;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.entity.DiscussionParticipant;
import endolphin.backend.domain.user.UserRepository;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.security.UserContext;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class DiscussionService {

    private final DiscussionRepository discussionRepository;
    private final DiscussionParticipantRepository discussionParticipantRepository;
    private final UserRepository userRepository;

    public CreateDiscussionResponse createDiscussion(CreateDiscussionRequest request) {

        Discussion discussion = Discussion.builder()
            .title(request.title())
            .dateStart(request.dateRangeStart())
            .dateEnd(request.dateRangeEnd())
            .timeStart(request.timeRangeStart())
            .timeEnd(request.timeRangeEnd())
            .duration(request.duration())
            .deadline(request.deadline())
            .meetingMethod(request.meetingMethod())
            .location(request.location())
            .build();

        discussionRepository.save(discussion);

        User currentUser = getCurrentUser();
        DiscussionParticipant participant = DiscussionParticipant.builder()
            .discussion(discussion)
            .user(currentUser)
            .isHost(true)
            .build();
        discussionParticipantRepository.save(participant);

        // 공유 링크 생성 (도메인 주소 설정 필요)
        String shareableLink = "localhost:8080/api/v1/discussion/invite/" + discussion.getId();

        return new CreateDiscussionResponse(
            discussion.getId(),
            discussion.getTitle(),
            discussion.getDateRangeStart(),
            discussion.getDateRangeEnd(),
            discussion.getMeetingMethod(),
            discussion.getLocation(),
            discussion.getDuration(),
            shareableLink,
            calculateTimeLeft(discussion.getDeadline())
        );
    }

    private User getCurrentUser() {
        Long userId = UserContext.get().userId();
        return userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
    }

    private String calculateTimeLeft(LocalDate deadline) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime deadlineDateTime = deadline.atTime(23, 59, 59);
        Duration duration = Duration.between(now, deadlineDateTime);

        long days = duration.toDays();
        long hours = duration.toHours() % 24;
        long minutes = duration.toMinutes() % 60;

        if (days > 0) {
            return "마감까지 " + days + "일";
        } else if (hours > 0) {
            return "마감까지 " + hours + "시간";
        } else {
            return "마감시간까지 " + minutes + "분";
        }
    }
}
