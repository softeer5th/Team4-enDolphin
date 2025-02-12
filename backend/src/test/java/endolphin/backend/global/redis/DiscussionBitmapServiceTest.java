package endolphin.backend.global.redis;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.BitSet;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class DiscussionBitmapServiceTest {

    @Autowired
    private DiscussionBitmapService bitmapService;


    @DisplayName("비트맵 초기화 및 비트 연산 테스트")
    @Test
    public void testInitializeAndBitOperations() {
        Long discussionId = 100L;
        LocalDateTime dateTime = LocalDateTime.now();

        // 1. 초기화: 해당 논의 및 시각에 대해 16비트 크기의 비트맵을 생성하여 Redis에 저장
        bitmapService.initializeBitmap(discussionId, dateTime);

        // 2. 오프셋 5의 비트를 true로 설정
        Boolean previousValue = bitmapService.setBitValue(discussionId, dateTime, 5, true);
        // 초기화된 비트맵은 모두 0이므로 이전 값은 false여야 함
        assertThat(previousValue).isFalse();

        // 3. 수정된 비트 조회: 오프셋 5의 비트 값이 true인지 확인
        Boolean bitValue = bitmapService.getBitValue(discussionId, dateTime, 5);
        assertThat(bitValue).isTrue();

        // 4. 전체 비트맵 데이터 조회 및 검증
        byte[] bitmapData = bitmapService.getBitmapData(discussionId, dateTime);
        int byteIndex = 5 / 8;          // 0
        int bitPosition = 5 % 8;        // 5
        // big-endian 순서로 확인: (7 - bitPosition)
        boolean extractedBit = ((bitmapData[byteIndex] >> (7 - bitPosition)) & 1) == 1;
        assertThat(extractedBit).isTrue();
    }

    @DisplayName("🗑️ 비트맵 비동기 삭제 테스트")
    @Test
    public void testDeleteDiscussionBitmapsUsingScan() throws Exception {
        Long discussionId = 200L;
        LocalDateTime dateTime = LocalDateTime.now();

        // 1. 초기화 및 데이터 삽입
        bitmapService.initializeBitmap(discussionId, dateTime);
        bitmapService.setBitValue(discussionId, dateTime, 3, true);

        // 2. 데이터 존재 확인
        byte[] beforeDelete = bitmapService.getBitmapData(discussionId, dateTime);
        assertThat(beforeDelete).isNotNull(); // 데이터가 존재해야 함

        // 3. 비동기 삭제 호출 및 완료 대기
        CompletableFuture<Void> deleteFuture = bitmapService.deleteDiscussionBitmapsUsingScan(
            discussionId);
        deleteFuture.get(5, TimeUnit.SECONDS);

        // 4. 삭제 후 데이터 검증
        byte[] afterDelete = bitmapService.getBitmapData(discussionId, dateTime);
        assertThat(afterDelete)
            .as("deleteDiscussionBitmapsUsingScan should remove the bitmap")
            .isNull();
    }

    @Test
    @DisplayName("비트 설정 테스트 (16비트 빅 엔디안 데이터)")
    public void testSetPersonalEventBitToBitmap_16Bit_BigEndian() {
        Long discussionId = 100L;
        LocalDateTime dateTime = LocalDateTime.now();

        byte[] bitmapData = bitmapService.getBitmapData(discussionId, dateTime);
        assertThat(bitmapData).isNull();

        Boolean result = bitmapService.setBitValue(discussionId, dateTime, 5, true);
        assertThat(result).isFalse();

        bitmapData = bitmapService.getBitmapData(discussionId, dateTime);
        assertThat(bitmapData).isNotNull();
        assertThat(bitmapData.length).isEqualTo(2);

        // BitSet.valueOf(byte[])는 각 바이트를 little-endian으로 해석함.
        // 따라서, 첫 바이트의 빅 엔디안 오프셋 5는 little-endian 인덱스 7 - 5 = 2에 해당함.
        BitSet bs = BitSet.valueOf(bitmapData);
        assertThat(bs.get(2))
            .as("빅 엔디안 기준 offset 5는 BitSet의 인덱스 2에 해당해야 합니다.")
            .isTrue();
    }


    @DisplayName("getDataOfDiscussionId 메서드 테스트")
    @Test
    public void testGetDataOfDiscussionId() {
        // given
        Long discussionId = 300L;
        // 특정 날짜 및 시각을 기준으로 테스트 (예: 2025-03-10 09:00)
        LocalDateTime dateTime = LocalDateTime.of(2025, 3, 10, 9, 0);
        // minute 단위로 변환
        long minuteKey = dateTime.toEpochSecond(ZoneOffset.UTC) / 60;

        // 해당 시각에 대해 비트맵 초기화 및 특정 비트 설정
        bitmapService.initializeBitmap(discussionId, dateTime);
        // 예시로 offset 2의 비트를 true로 설정
        bitmapService.setBitValue(discussionId, dateTime, 2, true);

        // 테스트할 시간 범위: minuteKey를 중심으로 ±10분
        long startRange = minuteKey - 10;
        long endRange = minuteKey + 10;

        // when: getDataOfDiscussionId 호출
        Map<Long, byte[]> dataMap = bitmapService.getDataOfDiscussionId(discussionId, startRange, endRange);

        // then
        assertThat(dataMap)
            .as("데이터 맵은 비어있지 않아야 합니다")
            .isNotEmpty();
        assertThat(dataMap).containsKey(minuteKey);

        byte[] data = dataMap.get(minuteKey);
        assertThat(data).isNotNull();

        // 비트 데이터에서 offset 5의 비트가 true인지 검증 (구현에 따라 인덱스 매핑이 달라질 수 있음)
        BitSet bs = BitSet.valueOf(data);
        assertThat(bs.get(5)).as("Offset 5의 비트는 true여야 합니다").isTrue();

        // 범위 밖으로 호출 시 해당 key가 조회되지 않아야 함
        Map<Long, byte[]> dataMapOut = bitmapService.getDataOfDiscussionId(discussionId, minuteKey + 1, minuteKey + 100);
        assertThat(dataMapOut).doesNotContainKey(minuteKey);
    }
}
