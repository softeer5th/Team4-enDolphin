package endolphin.backend.global.scheduler;

import static endolphin.backend.global.util.TimeUtil.TIME_ZONE;

import endolphin.backend.domain.discussion.DiscussionRepository;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.enums.DiscussionStatus;
import endolphin.backend.domain.shared_event.SharedEventService;
import endolphin.backend.global.redis.DiscussionBitmapService;
import java.time.LocalDate;
import java.time.ZoneId;
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
    private final DiscussionBitmapService discussionBitmapService;

    @Transactional
    @Scheduled(cron = "0 0 0 * * *", zone = TIME_ZONE)
    public void updateDiscussionStatusAtMidnight() {
        LocalDate today = LocalDate.now(ZoneId.of(TIME_ZONE));
        log.info("Scheduler 실행: {}. 논의 상태 업데이트 시작", today);

        List<Discussion> discussions = discussionRepository.findByDiscussionStatusNot(
            DiscussionStatus.FINISHED);

        List<Discussion> updatedDiscussions = new ArrayList<>();

        for (Discussion discussion : discussions) {
            try {
                Discussion updated = updateStatus(discussion, today);

                if (updated != null) {
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

                discussionBitmapService.deleteDiscussionBitmapsUsingScan(discussion.getId())
                    .thenRun(
                        () -> log.info("Redis keys deleted successfully for discussionId : {}",
                            discussion.getId()))
                    .exceptionally(ex -> {
                        log.error("Failed to delete Redis keys for three times", ex);
                        return null;
                    });

                return discussion;
            }
        } else if (sharedEventService.getSharedEvent(discussion.getId()).endDateTime()
            .toLocalDate().isBefore(today)) {
            discussion.setDiscussionStatus(DiscussionStatus.FINISHED);
            log.info("UPCOMING Discussion id {} FINISHED", discussion.getId());
            return discussion;
        }
        return null;
    }
}
