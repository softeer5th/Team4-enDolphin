package endolphin.backend.global.redis;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
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
}
