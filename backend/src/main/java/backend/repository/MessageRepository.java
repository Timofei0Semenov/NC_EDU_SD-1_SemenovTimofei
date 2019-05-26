package backend.repository;

import backend.entity.Message;
import backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllByReceiver(User user);

    List<Message> findAllBySenderAndTargetEquals(User sender, String target);
}
