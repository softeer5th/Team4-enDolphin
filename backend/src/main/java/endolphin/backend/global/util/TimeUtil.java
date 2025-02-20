package endolphin.backend.global.util;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class TimeUtil {

    public static long calculateTimeLeft(LocalDate deadline) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime deadlineDateTime = deadline.atTime(23, 59, 59);
        Duration duration = Duration.between(now, deadlineDateTime);

        return duration.toMillis();
    }

    public static LocalDateTime calculateMidTime(LocalDateTime startTime, LocalDateTime endTime) {
        Duration duration = Duration.between(startTime, endTime);
        duration = duration.dividedBy(2);

        return startTime.plus(duration);
    }
}
