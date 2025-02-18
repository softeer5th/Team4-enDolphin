package endolphin.backend.domain.personal_event;

import static org.assertj.core.api.Assertions.*;

import endolphin.backend.domain.personal_event.entity.PersonalEvent;
import endolphin.backend.domain.user.UserRepository;
import endolphin.backend.domain.user.entity.User;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.hibernate.Hibernate;
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
        LocalDate startTime = LocalDate.of(2025, 2, 2);
        LocalDate endTime = LocalDate.of(2025, 2, 9);

        // when
        List<PersonalEvent> personalEventList = personalEventRepository.findFilteredPersonalEvents(
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

    @Test
    @DisplayName("사용자들의 특정 기간 내 개인 일정을 조회한다")
    void findAllByUsersAndDateTimeRange() {
        // given
        // 테스트용 시간 설정
        LocalDateTime baseTime = LocalDateTime.of(2024, 2, 13, 12, 0);

        // 첫 번째 사용자 생성 및 저장
        User user1 = User.builder()
            .name("User 1")
            .email("user1@example.com")
            .picture("user1.png")
            .build();
        entityManager.persist(user1);

        // 두 번째 사용자 생성 및 저장
        User user2 = User.builder()
            .name("User 2")
            .email("user2@example.com")
            .picture("user2.png")
            .build();
        entityManager.persist(user2);

        // user1의 일정 생성 및 저장
        PersonalEvent event1 = PersonalEvent.builder()
            .user(user1)
            .startTime(baseTime.minusHours(1))
            .endTime(baseTime.plusHours(1))
            .title("Event 1")
            .build();
        entityManager.persist(event1);

        // user2의 일정 생성 및 저장
        PersonalEvent event2 = PersonalEvent.builder()
            .user(user2)
            .startTime(baseTime.minusHours(2))
            .endTime(baseTime.plusHours(2))
            .title("Event 2")
            .build();
        entityManager.persist(event2);

        // 검색 범위 밖의 일정 생성 및 저장
        PersonalEvent eventOutsideRange = PersonalEvent.builder()
            .user(user1)
            .startTime(baseTime.plusHours(5))
            .endTime(baseTime.plusHours(6))
            .title("Event Outside Range")
            .build();
        entityManager.persist(eventOutsideRange);

        entityManager.flush();
        entityManager.clear();

        // when
        List<PersonalEvent> events = personalEventRepository.findAllByUsersAndDateTimeRange(
            List.of(user1.getId(), user2.getId()),
            baseTime.minusHours(3),
            baseTime.plusHours(3)
        );

        // then
        assertThat(events)
            .isNotNull()
            .hasSize(2)
            .extracting(PersonalEvent::getTitle)
            .containsExactlyInAnyOrder("Event 1", "Event 2");

        // 연관된 사용자 정보가 함께 로드되었는지 확인 (N+1 문제 방지 검증)
        assertThat(events)
            .allSatisfy(event -> {
                assertThat(Hibernate.isInitialized(event.getUser())).isTrue();
                assertThat(event.getUser().getName()).isNotNull();
            });
    }

    @Test
    @DisplayName("특정 기간에 일정이 없는 경우 빈 리스트를 반환한다")
    void findAllByUsersAndDateTimeRange_returnsEmptyList_whenNoEventsInRange() {
        // given
        LocalDateTime baseTime = LocalDateTime.of(2024, 2, 13, 12, 0);

        User user = User.builder()
            .name("User")
            .email("user@example.com")
            .picture("user.png")
            .build();
        entityManager.persist(user);

        PersonalEvent event = PersonalEvent.builder()
            .user(user)
            .startTime(baseTime.plusHours(5))
            .endTime(baseTime.plusHours(6))
            .title("Event Outside Range")
            .build();
        entityManager.persist(event);

        entityManager.flush();
        entityManager.clear();

        // when
        List<PersonalEvent> events = personalEventRepository.findAllByUsersAndDateTimeRange(
            List.of(user.getId()),
            baseTime.minusHours(2),
            baseTime.plusHours(2)
        );

        // then
        assertThat(events).isEmpty();
    }

    @Test
    @DisplayName("일정이 검색 기간과 겹치는 경우를 정확히 조회한다")
    void findAllByUsersAndDateTimeRange_findsOverlappingEvents() {
        // given
        LocalDateTime baseTime = LocalDateTime.of(2024, 2, 13, 12, 0);
        LocalDateTime searchStart = baseTime.minusHours(1);
        LocalDateTime searchEnd = baseTime.plusHours(1);

        User user = User.builder()
            .name("User")
            .email("user@example.com")
            .picture("user.png")
            .build();
        entityManager.persist(user);

        // 검색 기간과 완전히 겹치는 일정
        PersonalEvent event1 = PersonalEvent.builder()
            .user(user)
            .startTime(searchStart)
            .endTime(searchEnd)
            .title("Exact Match")
            .build();
        entityManager.persist(event1);

        // 검색 기간의 시작과 겹치는 일정
        PersonalEvent event2 = PersonalEvent.builder()
            .user(user)
            .startTime(searchStart.minusHours(1))
            .endTime(searchStart.plusMinutes(30))
            .title("Overlap Start")
            .build();
        entityManager.persist(event2);

        // 검색 기간의 끝과 겹치는 일정
        PersonalEvent event3 = PersonalEvent.builder()
            .user(user)
            .startTime(searchEnd.minusMinutes(30))
            .endTime(searchEnd.plusHours(1))
            .title("Overlap End")
            .build();
        entityManager.persist(event3);

        entityManager.flush();
        entityManager.clear();

        // when
        List<PersonalEvent> events = personalEventRepository.findAllByUsersAndDateTimeRange(
            List.of(user.getId()),
            searchStart,
            searchEnd
        );

        // then
        assertThat(events)
            .hasSize(3)
            .extracting(PersonalEvent::getTitle)
            .containsExactlyInAnyOrder("Exact Match", "Overlap Start", "Overlap End");
    }
}