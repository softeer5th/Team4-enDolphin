package endolphin.backend.global.redis;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
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
        return dateTime.toEpochSecond(ZoneOffset.ofHours(9)) / 60;
    }

    /**
     * 해당 논의 및 시각(분)에 대해 16비트(2바이트) 크기의 비트맵을 초기화하여 Redis에 저장합니다.
     *
     * @param discussionId 논의 식별자
     * @param dateTime     초기화할 기준 시각 (분 단위로 변환됨)
     */
    public void initializeBitmap(Long discussionId, LocalDateTime dateTime) {
        int byteSize = 2;
        long minuteKey = convertToMinuteKey(dateTime);
        String redisKey = buildRedisKey(discussionId, minuteKey);
        byte[] initialData = new byte[byteSize];
        redisTemplate.opsForValue().set(redisKey, initialData);
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
}
