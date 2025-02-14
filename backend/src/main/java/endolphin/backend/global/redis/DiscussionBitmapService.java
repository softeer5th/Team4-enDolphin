package endolphin.backend.global.redis;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.RedisSystemException;
import org.springframework.data.redis.connection.RedisCommandsProvider;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisKeyCommands;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DiscussionBitmapService {

    private final RedisTemplate<String, byte[]> redisTemplate;

    /**
     * Redis 키 생성: "{discussionId}:{minuteKey}"
     */
    private String buildRedisKey(Long discussionId, long minuteKey) {
        return discussionId + ":" + minuteKey;
    }

    /**
     * LocalDateTime을 분 단위의 long 값(에포크 기준 분 값)으로 변환.
     */
    private long convertToMinuteKey(LocalDateTime dateTime) {
        return dateTime.toEpochSecond(ZoneOffset.UTC) / 60;
    }

    /**
     * 해당 논의 및 시각(분)에 대해 16비트(2바이트) 크기의 비트맵을 초기화하여 Redis에 저장합니다.
     *
     * @param discussionId 논의 식별자
     * @param dateTime     초기화할 기준 시각 (분 단위로 변환됨)
     */
    public void initializeBitmap(Long discussionId, LocalDateTime dateTime) {
        try {
            int byteSize = 2;
            long minuteKey = convertToMinuteKey(dateTime);
            String redisKey = buildRedisKey(discussionId, minuteKey);
            byte[] initialData = new byte[byteSize];
            //TODO: 만료 설정?
            redisTemplate.opsForValue().set(redisKey, initialData);
        } catch (RedisSystemException e) {
            //TODO: 예외 처리
            throw e;
        }
    }

    /**
     * 해당 논의의 특정 시각(분) 비트맵 데이터에서, 지정 오프셋의 비트를 수정합니다.
     *
     * @param discussionId 논의 식별자
     * @param dateTime     수정할 시각 (분 단위로 변환됨)
     * @param bitOffset    수정할 비트의 오프셋 (0부터 시작, 최대 15까지 사용 가능)
     * @param value        설정할 비트 값 (true/false)
     * @return 이전 비트 값 (true/false)
     */
    public Boolean setBitValue(Long discussionId, LocalDateTime dateTime, long bitOffset,
        boolean value) {
        long minuteKey = convertToMinuteKey(dateTime);
        String redisKey = buildRedisKey(discussionId, minuteKey);
        if (getBitmapData(discussionId, dateTime) == null) {
            initializeBitmap(discussionId, dateTime);
        }
        return redisTemplate.opsForValue().setBit(redisKey, bitOffset, value);
    }

    /**
     * 해당 논의의 특정 시각(분) 비트맵 데이터에서, 지정 오프셋의 비트 값을 조회합니다.
     *
     * @param discussionId 논의 식별자
     * @param dateTime     조회할 시각 (분 단위로 변환됨)
     * @param bitOffset    조회할 비트 오프셋 (0부터 시작)
     * @return 조회된 비트 값 (true/false)
     */
    public Boolean getBitValue(Long discussionId, LocalDateTime dateTime, long bitOffset) {
        long minuteKey = convertToMinuteKey(dateTime);
        String redisKey = buildRedisKey(discussionId, minuteKey);
        return redisTemplate.opsForValue().getBit(redisKey, bitOffset);
    }

    /**
     * 해당 논의의 특정 시각(분) 비트맵 데이터 전체를 조회합니다.
     *
     * @param discussionId 논의 식별자
     * @param dateTime     조회할 시각 (분 단위로 변환됨)
     * @return byte[] 형태의 전체 비트맵 데이터 (없으면 null)
     */
    public byte[] getBitmapData(Long discussionId, LocalDateTime dateTime) {
        long minuteKey = convertToMinuteKey(dateTime);
        String redisKey = buildRedisKey(discussionId, minuteKey);
        return redisTemplate.opsForValue().get(redisKey);
    }

    /**
     * SCAN을 이용해 해당 논의의 모든 비트맵 키를 찾고 삭제합니다.
     *
     * @param discussionId 논의 식별자
     */
    @Async
    public CompletableFuture<Void> deleteDiscussionBitmapsUsingScan(Long discussionId) {
        String pattern = discussionId + ":*";
        ScanOptions scanOptions = ScanOptions.scanOptions().match(pattern).count(1000).build();

        int retryCount = 0;
        int maxRetries = 3;

        while (retryCount < maxRetries) {
            try {
                redisTemplate.execute((RedisConnection connection) -> {
                    RedisKeyCommands keyCommands = ((RedisCommandsProvider) connection).keyCommands();

                    try (Cursor<byte[]> cursor = keyCommands.scan(scanOptions)) {
                        while (cursor.hasNext()) {
                            byte[] rawKey = cursor.next();
                            keyCommands.del(rawKey);
                        }
                    }
                    return null;
                });
                return CompletableFuture.completedFuture(null);
            } catch (Exception ex) {
                retryCount++;

                if (retryCount >= maxRetries) {
                    return CompletableFuture.failedFuture(ex);
                }

                try {
                    Thread.sleep(2000);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    return CompletableFuture.failedFuture(ie);
                }
            }
        }
        return CompletableFuture.completedFuture(null);
    }

    public Map<Long, byte[]> getDataOfDiscussionId(Long discussionId, Long startDateTime,
        Long endDateTime) {
        String pattern = discussionId + ":*";
        ScanOptions scanOptions = ScanOptions.scanOptions().match(pattern).count(1000).build();

        return redisTemplate.execute((RedisConnection connection) -> {
            RedisKeyCommands keyCommands = connection.keyCommands();
            Map<Long, byte[]> map = new HashMap<>();

            try (Cursor<byte[]> cursor = keyCommands.scan(scanOptions)) {
                while (cursor.hasNext()) {
                    byte[] rawKey = cursor.next();
                    String keyStr = new String(rawKey, StandardCharsets.UTF_8);
                    int colonIndex = keyStr.indexOf(':');

                    if (colonIndex != -1 && colonIndex < keyStr.length() - 1) {
                        String minuteKeyStr = keyStr.substring(colonIndex + 1);
                        try {
                            long minuteKey = Long.parseLong(minuteKeyStr);

                            if (isBetweenTimeRange(minuteKey, startDateTime, endDateTime)) {
                                byte[] data = connection.stringCommands().get(rawKey);
                                map.put(minuteKey, data);
                            }
                        } catch (NumberFormatException e) {
                            // 예: log.warn("Invalid minuteKey: {}", minuteKeyStr, e);
                        }
                    }
                }
            }
            return map;
        });
    }

    private boolean isBetweenTimeRange(long minuteKey, long startDateTime, long endDateTime) {
        if (minuteKey < startDateTime || minuteKey > endDateTime) {
            return false;
        }

        long timeRangeStart = startDateTime % 1440;
        long timeRangeEnd = endDateTime % 1440;

        return minuteKey % 1440 >= timeRangeStart && minuteKey % 1440 <= timeRangeEnd;
    }
}
