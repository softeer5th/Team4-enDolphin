package endolphin.backend.domain.discussion;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import endolphin.backend.domain.discussion.dto.CreateDiscussionRequest;
import endolphin.backend.domain.discussion.dto.DiscussionResponse;
import endolphin.backend.domain.discussion.enums.MeetingMethod;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
public class DiscussionControllerTest {

    @Mock
    private DiscussionService discussionService;

    @InjectMocks
    private DiscussionController discussionController;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    public void setUp() {
        // @WebMvcTest나 스프링 컨텍스트 없이 standalone 방식으로 MockMvc 구성
        mockMvc = MockMvcBuilders.standaloneSetup(discussionController).build();
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    @DisplayName("create discusison API 테스트")
    @Test
    public void testCreateDiscussionEndpoint() throws Exception {
        // given: 요청 DTO 생성
        CreateDiscussionRequest request = new CreateDiscussionRequest(
            "Test Discussion",
            LocalDate.now().plusDays(2),
            LocalDate.now().plusDays(7),
            LocalTime.of(9, 0),
            LocalTime.of(18, 0),
            60,
            MeetingMethod.ONLINE,
            null,
            LocalDate.now().plusDays(10)
        );

        // given: 서비스가 반환할 응답 DTO 생성
        DiscussionResponse response = new DiscussionResponse(
            100L,
            "Test Discussion",
            LocalDate.of(2025, 2, 10),
            LocalDate.of(2025, 2, 15),
            MeetingMethod.ONLINE,
            null,
            60,
            Duration.ofDays(10).toMillis()
        );

        given(discussionService.createDiscussion(request)).willReturn(response);

        // when & then
        mockMvc.perform(post("/api/v1/discussion")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").value(100))
            .andExpect(jsonPath("$.title").value("Test Discussion"));
    }
}
