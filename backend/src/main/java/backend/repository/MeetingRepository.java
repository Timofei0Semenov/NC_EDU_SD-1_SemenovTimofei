package backend.repository;

import backend.entity.Meeting;
import backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    List<Meeting> findAllByMembersContains(User user);
    List<Meeting> findAllByOwner(User user);
}
