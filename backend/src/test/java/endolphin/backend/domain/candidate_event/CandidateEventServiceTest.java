package endolphin.backend.domain.candidate_event;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.when;

import endolphin.backend.domain.candidate_event.dto.CalendarViewRequest;
import endolphin.backend.domain.candidate_event.dto.CalendarViewResponse;
import endolphin.backend.domain.candidate_event.dto.CandidateEventResponse;
import endolphin.backend.domain.candidate_event.dto.RankViewRequest;
import endolphin.backend.domain.candidate_event.dto.RankViewResponse;
import endolphin.backend.domain.discussion.DiscussionParticipantService;
import endolphin.backend.domain.discussion.DiscussionService;
import endolphin.backend.domain.discussion.entity.Discussion;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.util.ReflectionTestUtils;

@SpringBootTest
@Import(CandidateEventServiceTest.TestConfig.class)
public class CandidateEventServiceTest {

    @Autowired
    private CandidateEventService candidateEventService;

    @Autowired
    private RedisTemplate<String, byte[]> redisTemplate;

    @Autowired
    private DiscussionService discussionService;

    @Autowired
    private DiscussionParticipantService discussionParticipantService;

    private final Long discussionId = 1L;
    private final LocalDate testDate = LocalDate.now().plusDays(1);
    private final LocalTime startTime = LocalTime.of(9, 0);
    private final LocalTime endTime = LocalTime.of(17, 0);
    private final int duration = 90;

    @BeforeEach
    public void setUp() {
        // Discussion 객체 스텁 설정: 필드명은 service 코드에서 사용하는 getter에 맞춤 (예: getDateRangeStart 등)
        Discussion discussion = Discussion.builder()
            .dateStart(testDate)
            .dateEnd(testDate)
            .timeStart(startTime)
            .timeEnd(endTime)
            .duration(duration)
            .build();
        // Discussion의 ID 주입
        ReflectionTestUtils.setField(discussion, "id", discussionId);
        when(discussionService.getDiscussionById(discussionId)).thenReturn(discussion);

        // 참가자 관련 스텁: 필터값과 사용자 목록 (여기서는 빈 리스트)
        when(discussionParticipantService.getFilter(eq(discussionId), anyList()))
            .thenReturn(0xFFFF);
        when(discussionParticipantService.getUsersFromData(eq(discussionId), anyInt()))
            .thenReturn(Collections.emptyList());

        // 테스트 시작 전에 Redis에 이미 등록된 candidate event 관련 키 삭제
        Set<String> keys = redisTemplate.keys(discussionId + ":*");
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }

        LocalDateTime startDateTime = testDate.atTime(startTime);
        LocalDateTime endDateTime = testDate.atTime(endTime);
        long startMinute = startDateTime.toEpochSecond(ZoneOffset.UTC) / 60;
        long endMinute = endDateTime.toEpochSecond(ZoneOffset.UTC) / 60;
        int cnt = 0;
        for (long minute = startMinute + 30; minute <= endMinute; minute += 30) {
            int value = cnt++;
            byte[] data = new byte[] {
                (byte) ((value >> 8) & 0xFF),
                (byte) (value & 0xFF)
            };
            redisTemplate.opsForValue().set(discussionId + ":" + minute, data);
        }
    }

    @Test
    @DisplayName("많은 Redis 데이터가 등록된 상황에서 getEventsOnCalendarView 검증")
    public void testGetEventsOnCalendarView_WithMultipleData() {
        // CalendarViewRequest: 요청 범위는 testDate 하루 전체, 요청 사이즈 10
        CalendarViewRequest request = new CalendarViewRequest(
            testDate, testDate, new ArrayList<>(), 10
        );

        // when
        CalendarViewResponse response = candidateEventService.getEventsOnCalendarView(discussionId, request);

        // then
        assertThat(response).isNotNull();
        List<CandidateEventResponse> events = response.events();
        assertThat(events)
            .as("캘린더 뷰 응답에 하나 이상의 후보 이벤트가 포함되어야 합니다.")
            .isNotEmpty();

        // 예시로 첫 번째 이벤트의 시작, 종료 시간을 검증
        CandidateEventResponse firstEvent = events.get(0);
        long expectedStartMinute = testDate.atTime(startTime).toEpochSecond(ZoneOffset.UTC) / 60;
        LocalDateTime expectedStart = LocalDateTime.ofEpochSecond(expectedStartMinute * 60, 0, ZoneOffset.UTC);
        LocalDateTime expectedEnd = LocalDateTime.ofEpochSecond((expectedStartMinute + duration) * 60, 0, ZoneOffset.UTC);

        assertThat(firstEvent.startDateTime())
            .as("첫 번째 이벤트의 시작 시간이 예상과 일치해야 합니다.")
            .isEqualTo(expectedStart);
        assertThat(firstEvent.endDateTime())
            .as("첫 번째 이벤트의 종료 시간이 예상과 일치해야 합니다.")
            .isEqualTo(expectedEnd);

        // 참가자 목록은 스텁에 의해 빈 리스트로 설정되어 있음
        assertThat(firstEvent.usersForAdjust()).isEmpty();

        // 추가로, 여러 이벤트가 생성되었음을 확인 (예: 2개 이상)
        assertThat(events.size()).isGreaterThanOrEqualTo(2);
    }

    @Test
    @DisplayName("기본 순위와 시간순 정렬이 올바르게 구성되어야 한다.")
    public void testGetEventsOnRankView() {
        RankViewRequest request = new RankViewRequest(new ArrayList<>());

        // when
        RankViewResponse response = candidateEventService.getEventsOnRankView(discussionId, request);

        // then
        assertThat(response).isNotNull();

        List<CandidateEventResponse> defaultRanked = response.eventsRankedDefault();
        List<CandidateEventResponse> timeRanked = response.eventsRankedOfTime();

        assertThat(defaultRanked)
            .as("기본 순위 후보 이벤트 목록은 비어있지 않아야 합니다.")
            .isNotEmpty();
        assertThat(timeRanked)
            .as("시간순 정렬 후보 이벤트 목록은 비어있지 않아야 합니다.")
            .isNotEmpty();

        // timeRanked 는 시작 시간 기준 오름차순 정렬되어 있어야 합니다.
        List<CandidateEventResponse> sortedByTime = new ArrayList<>(timeRanked);
        sortedByTime.sort(Comparator.comparing(CandidateEventResponse::startDateTime));
        assertThat(timeRanked).isEqualTo(sortedByTime);

        //  기본 순위 목록과 시간순 정렬 목록이 동일 요소를 포함하는지 검증
        assertThat(defaultRanked).containsAll(timeRanked);
    }

    @TestConfiguration
    public static class TestConfig {

        @Bean
        public DiscussionService discussionService() {
            return Mockito.mock(DiscussionService.class);
        }

        @Bean
        public DiscussionParticipantService discussionParticipantService() {
            return Mockito.mock(DiscussionParticipantService.class);
        }
    }
}
