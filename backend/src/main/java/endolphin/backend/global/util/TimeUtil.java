package endolphin.backend.global.util;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

public class TimeUtil {

    public static final String TIME_ZONE = "Asia/Seoul";
    public static final long MINUTE_PER_DAY = 24 * 60;

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

    public static LocalDateTime roundDownToNearestHalfHour(LocalDateTime time) {
        int minute = time.getMinute();
        if (minute < 30) {
            time = time.minusMinutes(minute);
        } else {
            time = time.minusMinutes(minute - 30);
        }
        return time;
    }

    public static LocalDateTime roundUpToNearestHalfHour(LocalDateTime time) {
        int minute = time.getMinute();
        if (minute == 0) {
            time = time.plusMinutes(minute);
        } else if (minute < 30) {
            time = time.plusMinutes(30 - minute);
        } else {
            time = time.plusMinutes(60 - minute);
        }
        return time;
    }

    public static Long getSearchingEndTime(LocalDateTime personalEventEndTime,
        LocalDate discussionEndDate, LocalTime discussionEndTime) {

        long untilDateTime = convertToMinute(personalEventEndTime);
        long rangeDateTime = convertToMinute(discussionEndDate.atTime(discussionEndTime));
        long untilTime = untilDateTime % MINUTE_PER_DAY;
        long rangeTime = rangeDateTime % MINUTE_PER_DAY;

        if (untilDateTime > rangeDateTime) {
            return rangeDateTime;
        } else if (untilTime > rangeTime) {
            return untilDateTime - untilTime + rangeTime;
        }
        return untilDateTime;
    }

    public static Long getSearchingStartTime(LocalDateTime dateTime,
        LocalDate discussionStartDate, LocalTime discussionStartTime) {

        long startDateTime = convertToMinute(dateTime);
        long rangeDateTime = convertToMinute(discussionStartDate.atTime(discussionStartTime));
        long startTime = startDateTime % MINUTE_PER_DAY;
        long rangeTime = rangeDateTime % MINUTE_PER_DAY;

        if (startDateTime < rangeDateTime) {
            return rangeDateTime;
        } else if (startTime < rangeTime) {
            return startDateTime - startTime + rangeTime;
        }
        return startDateTime;
    }

    public static Long convertToMinute(LocalDateTime dateTime) {
        return dateTime.toEpochSecond(ZoneOffset.UTC) / 60;
    }

    public static Long convertToMinute(LocalDate date) {
        return convertToMinute(date.atStartOfDay());
    }

    public static Long convertToMinute(LocalTime time) {
        return (long) (time.toSecondOfDay() / 60);
    }

    public static LocalDateTime convertToLocalDateTime(long minuteKey) {
        long epochSeconds = minuteKey * 60;
        return LocalDateTime.ofEpochSecond(epochSeconds, 0, ZoneOffset.UTC);
    }

    public static LocalDateTime getNow() {
        return LocalDateTime.now(ZoneId.of(TIME_ZONE));
    }
}
