package endolphin.backend.global.util;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneOffset;

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
        LocalDate discussionStartDate, LocalTime discussionStartTime, LocalTime discussionEndTime) {

        LocalDate currentDate = personalEventStartTime.toLocalDate();
        if (currentDate.isBefore(discussionStartDate)) {
            return convertToMinute(discussionStartDate.atTime(discussionStartTime));
        }

        LocalTime currentTime = personalEventStartTime.toLocalTime();
        if (currentTime.isBefore(discussionStartTime)) {
            currentTime = discussionStartTime;
        } else if (currentTime.isAfter(discussionEndTime)) {
            currentTime = discussionStartTime;
            currentDate = currentDate.plusDays(1);
        }

        return convertToMinute(currentDate.atTime(currentTime));
    }

    public static Long getUntilDateTime(LocalDateTime personalEventEndTime,
        LocalDate discussionEndDate, LocalTime discussionEndTime, LocalTime discussionStartTime) {
        LocalDate untilDate = personalEventEndTime.toLocalDate();
        if (untilDate.isAfter(discussionEndDate)) {
            return convertToMinute(discussionEndDate.atTime(discussionEndTime));
        }

        LocalTime untilTime = personalEventEndTime.toLocalTime();
        if (untilTime.isAfter(discussionEndTime)) {
            untilTime = discussionEndTime;
        } else if (untilTime.isBefore(discussionStartTime)) {
            untilTime = discussionEndTime;
            untilDate = untilDate.minusDays(1);
        }

        return convertToMinute(untilDate.atTime(untilTime));
    }

    public static Long convertToMinute(LocalDateTime dateTime) {
        return dateTime.toEpochSecond(ZoneOffset.UTC) / 60;
    }

    public static Long convertToMinute(LocalTime time) {
        return (long) (time.toSecondOfDay() / 60);
    }

    public static LocalDateTime convertToLocalDateTime(long minuteKey) {
        long epochSeconds = minuteKey * 60;
        return LocalDateTime.ofEpochSecond(epochSeconds, 0, ZoneOffset.UTC);
    }
}
