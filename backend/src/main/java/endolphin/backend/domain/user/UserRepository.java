package endolphin.backend.domain.user;

import endolphin.backend.domain.user.dto.UserIdNameDto;
import endolphin.backend.domain.user.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query("SELECT new endolphin.backend.domain.user.dto.UserIdNameDto(u.id, u.name) " +
        "FROM User u WHERE u.id IN :userIds")
    List<UserIdNameDto> findUserIdNameInIds(@Param("userIds") List<Long> userIds);
}
