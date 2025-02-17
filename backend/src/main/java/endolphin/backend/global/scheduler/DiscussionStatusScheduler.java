package endolphin.backend.global.scheduler;

import endolphin.backend.domain.discussion.DiscussionRepository;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.enums.DiscussionStatus;
import endolphin.backend.domain.shared_event.SharedEventService;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
public class DiscussionStatusScheduler {

    private final DiscussionRepository discussionRepository;
    private final SharedEventService sharedEventService;

    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void updateDiscussionStatusAtMidnight() {
        LocalDate today = LocalDate.now();
        log.info("Scheduler 실행: {}. 논의 상태 업데이트 시작", today);

        List<Discussion> discussions = discussionRepository.findByDiscussionStatusNot(
            DiscussionStatus.FINISHED);

        List<Discussion> updatedDiscussions = new ArrayList<>();

        for (Discussion discussion : discussions) {
            try {
                Discussion updated = updateStatus(discussion, today);

                if(updated != null) {
                    updatedDiscussions.add(updated);
                }
            } catch (Exception e) {
                log.error("Discussion id {} 업데이트 실패: {}", discussion.getId(), e.getMessage());
            }
        }

        discussionRepository.saveAll(updatedDiscussions);
    }

    public Discussion updateStatus(Discussion discussion, LocalDate today) {
        if (discussion.getDiscussionStatus() == DiscussionStatus.ONGOING) {
            if (discussion.getDateRangeEnd().isBefore(today)) {
                discussion.setDiscussionStatus(DiscussionStatus.FINISHED);
                discussion.setFixedDate(discussion.getDateRangeEnd());
                log.info("ONGOING Discussion id {} FINISHED", discussion.getId());
                return discussion;
            }
        } else if (sharedEventService.getSharedEvent(discussion.getId()).endDateTime()
            .toLocalDate().isBefore(today)) {
            discussion.setDiscussionStatus(DiscussionStatus.FINISHED);
            discussionRepository.save(discussion);
            log.info("UPCOMING Discussion id {} FINISHED", discussion.getId());
            return discussion;
        }
        return null;
    }
}
