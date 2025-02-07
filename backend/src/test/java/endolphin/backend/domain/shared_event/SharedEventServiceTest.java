package endolphin.backend.domain.shared_event;

import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.shared_event.dto.SharedEventRequest;
import endolphin.backend.domain.shared_event.dto.SharedEventResponse;
import endolphin.backend.domain.shared_event.entity.SharedEvent;
import endolphin.backend.global.error.ErrorResponse;
import endolphin.backend.global.error.exception.ApiException;
import endolphin.backend.global.error.exception.ErrorCode;
import org.junit.jupiter.api.BeforeEach;
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
            .start(request.startTime())
            .end(request.endTime())
            .build();

        ReflectionTestUtils.setField(sharedEvent, "id", 100L);
    }

    @Test
    void createSharedEvent_Success() {
        when(sharedEventRepository.save(any(SharedEvent.class))).thenReturn(sharedEvent);

        SharedEventResponse response = sharedEventService.createSharedEvent(discussion, request);

        assertThat(response).isNotNull();
        assertThat(response.id()).isEqualTo(100L);
        assertThat(response.startDateTime()).isEqualTo(request.startTime());
        assertThat(response.endDateTime()).isEqualTo(request.endTime());

        verify(sharedEventRepository, times(1)).save(any(SharedEvent.class));
    }

    @Test
    void getSharedEvent_Success() {
        when(sharedEventRepository.findById(100L)).thenReturn(Optional.of(sharedEvent));

        SharedEventResponse response = sharedEventService.getSharedEvent(100L);

        assertThat(response).isNotNull();
        assertThat(response.id()).isEqualTo(100L);

        verify(sharedEventRepository, times(1)).findById(100L);
    }

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

    @Test
    void deleteSharedEvent_Success() {
        doNothing().when(sharedEventRepository).deleteById(100L);

        sharedEventService.deleteSharedEvent(100L);

        verify(sharedEventRepository, times(1)).deleteById(100L);
    }
}
