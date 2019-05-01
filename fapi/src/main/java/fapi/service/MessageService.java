package fapi.service;

import fapi.models.Message;
import fapi.models.User;

import java.util.List;
import java.util.Optional;

public interface MessageService {
    Message saveMessage(Message message);

    Message findMessageById(Long id);

    List<Message> findAll();

    void deleteMessage(Long id);

    List<Message> findAllByReceiver(String login);

    void saveAnyMessages (Message[] messages);
}
