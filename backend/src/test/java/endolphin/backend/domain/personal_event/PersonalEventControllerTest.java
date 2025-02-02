package endolphin.backend.domain.personal_event;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import endolphin.backend.domain.personal_event.dto.PersonalEventResponse;
import java.time.LocalDateTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
class PersonalEventControllerTest {

    private MockMvc mockMvc;

    @Mock
    private PersonalEventService personalEventService;

    @InjectMocks
    private PersonalEventController personalEventController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(personalEventController)
            .build();
    }

    @Test
    @DisplayName("buildResourceURI 생성 테스트")
    void createPersonalEvent() throws Exception {
        String requestJson = """
            {
                "title": "Title",
                "startTime": "2025-02-02T10:00:00Z",
                "endTime": "2025-02-02T12:00:00Z",
                "isAdjustable": false
            }
            """;
        PersonalEventResponse personalEventResponse = new PersonalEventResponse(1L, "title",
            LocalDateTime.of(2025, 2, 2, 10, 0), LocalDateTime.of(2025, 2, 2, 12, 0), false);
        given(personalEventService.createPersonalEvent(any())).willReturn(personalEventResponse);
        MvcResult result =  mockMvc.perform(post("/api/v1/personal-event").
            contentType(MediaType.APPLICATION_JSON)
            .content(requestJson))
            .andDo(print())
            .andReturn();
        String location = result.getResponse().getHeader("Location");
        assertThat(location).isNotNull();
        assertThat(location).contains(String.format("/api/v1/personal-event/%d", personalEventResponse.id()));
    }
}