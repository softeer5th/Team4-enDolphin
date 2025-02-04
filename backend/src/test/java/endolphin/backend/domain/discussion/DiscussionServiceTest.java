package endolphin.backend.domain.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import endolphin.backend.domain.discussion.dto.CreateDiscussionRequest;
import endolphin.backend.domain.discussion.dto.CreateDiscussionResponse;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.enums.MeetingMethod;
import endolphin.backend.domain.user.UserService;
import endolphin.backend.domain.user.entity.User;
import java.time.LocalDate;
import java.time.LocalTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
public class DiscussionServiceTest {

    @Mock
    private DiscussionRepository discussionRepository;

    @Mock
    private DiscussionParticipantRepository discussionParticipantRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private DiscussionService discussionService;

    @DisplayName("필드값이 다 채워진 Discussion create 테스트")
    @Test
    public void createDiscussion_withValidRequest_returnsExpectedResponse() {
        CreateDiscussionRequest request = new CreateDiscussionRequest(
            "팀 회의",
            LocalDate.of(2025, 2, 10),
            LocalDate.of(2025, 2, 15),
            LocalTime.of(9, 0),
            LocalTime.of(18, 0),
            60,
            MeetingMethod.OFFLINE,
            "회의실 1",
            LocalDate.now().plusDays(10)
        );

        given(discussionRepository.save(any(Discussion.class))).willAnswer(invocation -> {
            Discussion disc = invocation.getArgument(0);
            ReflectionTestUtils.setField(disc, "id", 100L);
            return disc;
        });

        User dummyUser = new User();
        ReflectionTestUtils.setField(dummyUser, "id", 1L);
        given(userService.getCurrentUser()).willReturn(dummyUser);

        // when
        CreateDiscussionResponse response = discussionService.createDiscussion(request);

        // then
        assertThat(response).isNotNull();
        assertThat(response.id()).isEqualTo(100L);
        assertThat(response.title()).isEqualTo("팀 회의");
        assertThat(response.dateRangeStart()).isEqualTo(LocalDate.of(2025, 2, 10));
        assertThat(response.dateRangeEnd()).isEqualTo(LocalDate.of(2025, 2, 15));
        assertThat(response.meetingMethod()).isEqualTo(MeetingMethod.OFFLINE);
        assertThat(response.location()).isEqualTo("회의실 1");
        assertThat(response.duration()).isEqualTo(60);
        assertThat(response.shareableLink())
            .isEqualTo("localhost:8080/api/v1/discussion/invite/100");
        assertThat(response.timeLeft()).isNotNull();
        assertThat(response.timeLeft()).isEqualTo("마감까지 10일");
    }
}
