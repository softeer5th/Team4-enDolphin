package endolphin.backend.global.util;

import static org.assertj.core.api.Assertions.*;

import endolphin.backend.global.error.exception.ApiException;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ValidatorTest {

    @Test
    @DisplayName("시간 범위 체크 테스트")
    void validateDateTimeRangeTest_Success() {
        LocalDateTime startTime = LocalDateTime.of(2020, 1, 1, 0, 0);
        LocalDateTime endTime = LocalDateTime.of(2020, 12, 31, 23, 59, 59);

        assertThatCode(() -> Validator.validateDateTimeRange(startTime, endTime))
            .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("시간 범위 체크 예외 테스트")
    void validateDateTimeRangeTest_Failure() {
        LocalDateTime startTime = LocalDateTime.of(2020, 12, 31, 23, 59, 59);
        LocalDateTime endTime = LocalDateTime.of(2020, 10, 31, 23, 59, 59);

        assertThatThrownBy(() -> Validator.validateDateTimeRange(startTime, endTime))
            .isInstanceOf(ApiException.class);
    }
}