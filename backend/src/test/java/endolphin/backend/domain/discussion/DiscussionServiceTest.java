package endolphin.backend.domain.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import endolphin.backend.domain.discussion.dto.CreateDiscussionRequest;
import endolphin.backend.domain.discussion.dto.CreateDiscussionResponse;
import endolphin.backend.domain.discussion.entity.Discussion;
import endolphin.backend.domain.discussion.enums.MeetingMethod;
import endolphin.backend.domain.user.UserRepository;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.security.UserContext;
import endolphin.backend.global.security.UserInfo;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
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
    private UserRepository userRepository;

    @InjectMocks
    private DiscussionService discussionService;

    @BeforeEach
    public void setUp() {
        // JWT 필터 등에서 설정하는 현재 사용자 정보를 UserContext에 등록
        UserInfo dummyUser = new UserInfo(1L, "dummy@example.com");
        UserContext.set(dummyUser);
    }

    @AfterEach
    public void tearDown() {
        UserContext.clear();
    }

    @Test
    public void testCreateDiscussion_withDeadlineProvided() {
        // given: 모든 필드가 채워진 요청 (deadline 제공)
        CreateDiscussionRequest request = new CreateDiscussionRequest(
            "Test Discussion",
            LocalDate.of(2025, 2, 10),
            LocalDate.of(2025, 2, 15),
            LocalTime.of(9, 0),
            LocalTime.of(18, 0),
            60,
            MeetingMethod.OFFLINE,
            "Test Location",
            LocalDate.of(2025, 2, 20)
        );

        given(discussionRepository.save(any(Discussion.class))).willAnswer(invocation -> {
            Discussion d = invocation.getArgument(0);
            // Reflection을 사용해 private id 필드에 값을 주입
            ReflectionTestUtils.setField(d, "id", 100L);
            return d;
        });

        User user = new User();
        ReflectionTestUtils.setField(user, "id", 1L);

        given(userRepository.findById(1L)).willReturn(Optional.of(user));

        // when
        CreateDiscussionResponse response = discussionService.createDiscussion(request);

        // then
        assertThat(response).isNotNull();
        assertThat(response.id()).isEqualTo(100L);
        assertThat(response.title()).isEqualTo("Test Discussion");
        assertThat(response.dateRangeStart()).isEqualTo(LocalDate.of(2025, 2, 10));
        assertThat(response.dateRangeEnd()).isEqualTo(LocalDate.of(2025, 2, 15));
        assertThat(response.meetingMethod()).isEqualTo(MeetingMethod.OFFLINE);
        assertThat(response.location()).isEqualTo("Test Location");
        assertThat(response.duration()).isEqualTo(60);
        assertThat(response.shareableLink()).isEqualTo(
            "localhost:8080/api/v1/discussion/invite/100");
        assertThat(response.timeLeft()).isNotNull();
    }
}
