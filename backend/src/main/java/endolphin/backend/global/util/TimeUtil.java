package endolphin.backend.global.util;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneOffset;

public class TimeUtil {

    private static final long MINUTE_PER_DAY = 24 * 60;

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

    public static Long getCurrentDateTime(LocalDateTime personalEventStartTime,
        LocalDate discussionStartDate, LocalTime discussionStartTime) {

        long currentDateTime = convertToMinute(roundDownToNearestHalfHour(personalEventStartTime));
        long startDateTime = convertToMinute(discussionStartDate.atTime(discussionStartTime));
        long currentTime = currentDateTime % MINUTE_PER_DAY;
        long minTime = startDateTime % MINUTE_PER_DAY;

        if (currentDateTime < startDateTime) {
            return startDateTime;
        } else if (currentTime < minTime) {
            return currentDateTime - currentTime + minTime;
        }
        return currentDateTime;
    }

    public static Long getUntilDateTime(LocalDateTime personalEventEndTime,
        LocalDate discussionEndDate, LocalTime discussionEndTime) {

        long untilDateTime = convertToMinute(roundUpToNearestHalfHour(personalEventEndTime));
        long endDateTime = convertToMinute(discussionEndDate.atTime(discussionEndTime));
        long untilTime = untilDateTime % MINUTE_PER_DAY;
        long maxTime = endDateTime % MINUTE_PER_DAY;

        if (untilDateTime > endDateTime) {
            return endDateTime;
        } else if (untilTime > maxTime) {
            return untilDateTime - untilTime + maxTime;
        }
        return untilDateTime;
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

    public static boolean isBetweenTimeRange(long minuteKey, long startDateTime, long endDateTime) {
        if (minuteKey < startDateTime || minuteKey > endDateTime) {
            return false;
        }

        long timeRangeStart = startDateTime % MINUTE_PER_DAY;
        long timeRangeEnd = endDateTime % MINUTE_PER_DAY;
        long minuteKeyTime = minuteKey % MINUTE_PER_DAY;

        return minuteKeyTime >= timeRangeStart && minuteKeyTime <= timeRangeEnd;
    }
}
