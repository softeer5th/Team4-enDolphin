package endolphin.backend.domain.personal_event;

import static org.assertj.core.api.Assertions.*;

import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.user.UserRepository;
import endolphin.backend.domain.user.entity.User;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

@DataJpaTest
class PersonalEventRepositoryTest {

    @Autowired
    private PersonalEventRepository personalEventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestEntityManager entityManager;

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

    @Test
    @DisplayName("findFilteredPersonalEvents: 날짜 필터 조건에 맞는 PersonalEvent 조회")
    void testFindFilteredPersonalEvents() {
        // Given: 테스트용 사용자 생성 및 persist
        entityManager.persist(testUser);

        // 필터링 조건
        // 날짜 조건: 2025-02-09 (단일 날짜 범위)
        LocalDate filterStartDate = LocalDate.of(2025, 2, 9);
        LocalDate filterEndDate = LocalDate.of(2025, 2, 12);

        // PersonalEvent 생성
        PersonalEvent matchingEvent1 = PersonalEvent.builder()
            .user(testUser)
            .title("Matching Event")
            .startTime(LocalDateTime.of(2025, 2, 9, 10, 0))
            .endTime(LocalDateTime.of(2025, 2, 9, 12, 0))
            .build();

        PersonalEvent nonMatchingDateEvent = PersonalEvent.builder()
            .user(testUser)
            .title("Non Matching Date Event")
            .startTime(LocalDateTime.of(2025, 2, 8, 10, 0))
            .endTime(LocalDateTime.of(2025, 2, 8, 12, 0))
            .build();

        PersonalEvent matchingEvent2 = PersonalEvent.builder()
            .user(testUser)
            .title("Matching Time Event")
            .startTime(LocalDateTime.of(2025, 2, 9, 8, 0))
            .endTime(LocalDateTime.of(2025, 2, 20, 8, 30))
            .build();

        // 4) 조건에 걸치는 이벤트
        PersonalEvent matchingEvent3 = PersonalEvent.builder()
            .user(testUser)
            .title("Matching Event2")
            .startTime(LocalDateTime.of(2025, 2, 10, 7, 0))
            .endTime(LocalDateTime.of(2025, 2, 11, 1, 0))
            .build();

        PersonalEvent matchingEvent4 = PersonalEvent.builder()
            .user(testUser)
            .title("Matching Event3")
            .startTime(LocalDateTime.of(2025, 2, 8, 12, 0))
            .endTime(LocalDateTime.of(2025, 2, 13, 20, 0))
            .build();

        entityManager.persist(matchingEvent1);
        entityManager.persist(nonMatchingDateEvent);
        entityManager.persist(matchingEvent2);
        entityManager.persist(matchingEvent3);
        entityManager.persist(matchingEvent4);
        entityManager.flush();
        entityManager.clear();

        // When: 필터 조건에 따라 이벤트 조회
        List<PersonalEvent> events = personalEventRepository.findFilteredPersonalEvents(
            testUser, filterStartDate, filterEndDate);

        // Then: "Matching Event"만 조회되어야 한다.
        assertThat(events)
            .hasSize(4);
    }
}