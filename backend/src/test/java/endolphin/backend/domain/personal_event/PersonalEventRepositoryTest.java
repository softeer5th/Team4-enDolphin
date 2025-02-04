package endolphin.backend.domain.personal_event;

import static org.assertj.core.api.Assertions.*;

import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.user.UserRepository;
import endolphin.backend.domain.user.entity.User;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class PersonalEventRepositoryTest {

    @Autowired
    private PersonalEventRepository personalEventRepository;

    @Autowired
    private UserRepository userRepository;

    private User testUser;

    private PersonalEvent personalEvent1;
    private PersonalEvent personalEvent2;

    @BeforeEach
    void setUp() {
        testUser = User.builder().name("test user").email("test@email.com")
            .picture("testPictureUrl").build();
        testUser = userRepository.save(testUser);

        personalEvent1 = PersonalEvent.builder()
            .title("Meeting")
            .user(testUser)
            .startTime(LocalDateTime.of(2025, 2, 3, 16, 0))
            .endTime(LocalDateTime.of(2025, 2, 3, 18, 0))
            .build();

        personalEvent2 = PersonalEvent.builder()
            .title("Meeting2")
            .user(testUser)
            .startTime(LocalDateTime.of(2025, 2, 5, 8, 0))
            .endTime(LocalDateTime.of(2025, 2, 5, 20, 0))
            .build();

        personalEvent1 = personalEventRepository.save(personalEvent1);
        personalEvent2 = personalEventRepository.save(personalEvent2);
    }

    @Test
    @DisplayName("개인 일정 검색 테스트")
    void searchTest() {
        // given
        LocalDateTime startTime = LocalDateTime.of(2025, 2, 2, 10, 0);
        LocalDateTime endTime = LocalDateTime.of(2025, 2, 9, 10, 0);

        // when
        List<PersonalEvent> personalEventList = personalEventRepository.findByUserAndStartTimeBetween(
            testUser, startTime, endTime
        );

        // then
        assertThat(personalEventList.size()).isEqualTo(2);
        assertThat(personalEventList.get(0).getTitle()).isEqualTo("Meeting");
    }
}