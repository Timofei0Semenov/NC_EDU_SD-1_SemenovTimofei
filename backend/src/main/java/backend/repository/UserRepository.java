package backend.repository;

import backend.entity.Meeting;
import backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByLogin(String login);

    List<User> findAllByMeetingsContains(Meeting meeting);

    Optional<User> findByEmail(String email);

    List<User> findByFriendsContains(User user);
}
