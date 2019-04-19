package backend.service;

import backend.entity.Message;
import backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface MessageService {

    Message saveMessage(Message message);

    Optional<Message> findMessageById(Long id);

    List<Message> findAll();

    void deleteMessage(Long id);

    List<Message> findAllByReceiver(User user);
}
