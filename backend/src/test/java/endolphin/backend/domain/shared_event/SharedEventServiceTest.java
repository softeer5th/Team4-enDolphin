package endolphin.backend.domain.shared_event;

import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.shared_event.dto.SharedEventRequest;
import endolphin.backend.domain.shared_event.dto.SharedEventDto;
import endolphin.backend.domain.shared_event.entity.SharedEvent;
import endolphin.backend.global.error.ErrorResponse;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.catchThrowable;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

class SharedEventServiceTest {

    @Mock
    private SharedEventRepository sharedEventRepository;

    @InjectMocks
    private SharedEventService sharedEventService;

    private Discussion discussion;
    private SharedEventRequest request;
    private SharedEvent sharedEvent;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        discussion = Discussion.builder()
            .title("Team Meeting")
            .build();

        request = new SharedEventRequest(
            LocalDateTime.of(2025, 3, 1, 10, 0),
            LocalDateTime.of(2025, 3, 1, 12, 0)
        );

        sharedEvent = SharedEvent.builder()
            .discussion(discussion)
            .start(request.startDateTime())
            .end(request.endDateTime())
            .build();

        ReflectionTestUtils.setField(sharedEvent, "id", 100L);
    }

    @DisplayName("공유 일정 생성 성공")
    @Test
    void createSharedEvent_Success() {
        when(sharedEventRepository.save(any(SharedEvent.class))).thenReturn(sharedEvent);

        SharedEventDto response = sharedEventService.createSharedEvent(discussion, request);

        assertThat(response).isNotNull();
        assertThat(response.id()).isEqualTo(100L);
        assertThat(response.startDateTime()).isEqualTo(request.startDateTime());
        assertThat(response.endDateTime()).isEqualTo(request.endDateTime());

        verify(sharedEventRepository, times(1)).save(any(SharedEvent.class));
    }

    @DisplayName("공유 일정 조회 성공")
    @Test
    void getSharedEvent_Success() {
        when(sharedEventRepository.findById(100L)).thenReturn(Optional.of(sharedEvent));

        SharedEventDto response = sharedEventService.getSharedEvent(100L);

        assertThat(response).isNotNull();
        assertThat(response.id()).isEqualTo(100L);

        verify(sharedEventRepository, times(1)).findById(100L);
    }

    @DisplayName("존재하지 않는 공유 일정 조회에 대한 에러 응답 테스트")
    @Test
    void getSharedEvent_NotFound_ThrowsException() {
        when(sharedEventRepository.findById(999L)).thenReturn(Optional.empty());

        ApiException exception = (ApiException) catchThrowable(() ->
            sharedEventService.getSharedEvent(999L)
        );

        ErrorResponse errorResponse = ErrorResponse.of(exception.getErrorCode());

        assertThat(errorResponse).isNotNull();
        assertThat(errorResponse.message()).isEqualTo(
            ErrorCode.SHARED_EVENT_NOT_FOUND.getMessage());
        assertThat(errorResponse.code()).isEqualTo(ErrorCode.SHARED_EVENT_NOT_FOUND.getCode());

        verify(sharedEventRepository, times(1)).findById(999L);
    }

    @DisplayName("공유 일정 삭제 성공")
    @Test
    void deleteSharedEvent_Success() {
        Long sharedEventId = 100L;

        when(sharedEventRepository.existsById(sharedEventId)).thenReturn(true);
        doNothing().when(sharedEventRepository).deleteById(sharedEventId);

        sharedEventService.deleteSharedEvent(sharedEventId);

        verify(sharedEventRepository, times(1)).existsById(sharedEventId);
        verify(sharedEventRepository, times(1)).deleteById(sharedEventId);
    }

    @DisplayName("존재하지 않는 공유 일정 삭제 시 에러 응답 테스트")
    @Test
    void deleteSharedEvent_NotFound_ThrowsException() {
        Long sharedEventId = 999L;

        when(sharedEventRepository.existsById(sharedEventId)).thenReturn(false);

        ApiException exception = (ApiException) catchThrowable(() ->
            sharedEventService.deleteSharedEvent(999L)
        );

        ErrorResponse errorResponse = ErrorResponse.of(exception.getErrorCode());

        assertThat(errorResponse).isNotNull();
        assertThat(errorResponse.message()).isEqualTo(
            ErrorCode.SHARED_EVENT_NOT_FOUND.getMessage());
        assertThat(errorResponse.code()).isEqualTo(ErrorCode.SHARED_EVENT_NOT_FOUND.getCode());

        verify(sharedEventRepository, times(1)).existsById(sharedEventId);
        verify(sharedEventRepository, never()).deleteById(anyLong());
    }

    @DisplayName("discussion Id 리스트에 해당하는 공유 일정 목록 조회 성공")
    @Test
    public void testGetSharedEventMap() {
        // 준비: 두 개의 Discussion 생성 (ID: 100, 101)
        Discussion discussion1 = new Discussion();
        ReflectionTestUtils.setField(discussion1, "id", 100L);

        Discussion discussion2 = new Discussion();
        ReflectionTestUtils.setField(discussion2, "id", 101L);

        // 준비: 두 개의 SharedEvent 생성, 각 Discussion과 연결
        SharedEvent event1 = new SharedEvent();
        ReflectionTestUtils.setField(event1, "id", 1L);
        ReflectionTestUtils.setField(event1, "discussion", discussion1);
        LocalDateTime start1 = LocalDateTime.of(2025, 1, 1, 9, 0);
        LocalDateTime end1 = LocalDateTime.of(2025, 1, 1, 17, 0);
        ReflectionTestUtils.setField(event1, "startDateTime", start1);
        ReflectionTestUtils.setField(event1, "endDateTime", end1);

        SharedEvent event2 = new SharedEvent();
        ReflectionTestUtils.setField(event2, "id", 2L);
        ReflectionTestUtils.setField(event2, "discussion", discussion2);
        LocalDateTime start2 = LocalDateTime.of(2025, 2, 1, 10, 0);
        LocalDateTime end2 = LocalDateTime.of(2025, 2, 1, 18, 0);
        ReflectionTestUtils.setField(event2, "startDateTime", start2);
        ReflectionTestUtils.setField(event2, "endDateTime", end2);

        // 모의: sharedEventRepository.findByDiscussionIdIn(...)가 두 이벤트를 반환하도록 설정
        List<SharedEvent> events = Arrays.asList(event1, event2);
        given(sharedEventRepository.findByDiscussionIdIn(Arrays.asList(100L, 101L)))
            .willReturn(events);

        // When: Service 메서드 호출
        Map<Long, SharedEventDto> result = sharedEventService.getSharedEventMap(Arrays.asList(100L, 101L));

        // Then: 반환된 Map이 두 개의 key를 포함하고, 각 key에 대해 SharedEventDto가 올바르게 매핑되는지 검증
        assertThat(result).hasSize(2);
        SharedEventDto expectedDto1 = SharedEventDto.of(event1);
        SharedEventDto expectedDto2 = SharedEventDto.of(event2);
        assertThat(result.get(100L)).isEqualTo(expectedDto1);
        assertThat(result.get(101L)).isEqualTo(expectedDto2);
    }
}
