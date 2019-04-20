package backend.controller;

import backend.entity.Message;
import backend.entity.User;
import backend.service.MeetingService;
import backend.service.MessageService;
import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/messages")
public class MessageController {

    private MessageService messageService;

    private UserService userService;

    @Autowired
    public MessageController(MessageService messageService, UserService userService) {
        this.messageService = messageService;
        this.userService = userService;
    }

    @GetMapping(value = "/all")
    public List<Message> getAll() {
        return messageService.findAll();
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity deleteMessage(@PathVariable(name = "id") Long id) {
        if (!messageService.findMessageById(id).isPresent()) return ResponseEntity.notFound().build();
        messageService.deleteMessage(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public void saveMessage(@RequestBody Message message) {
        messageService.saveMessage(message);
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable(name = "id") @Min(value = 1) Long id) {
        Optional<Message> message = messageService.findMessageById(id);
        return message.isPresent() ? ResponseEntity.ok(message.get()) : ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/byReceiver/{login}")
    public ResponseEntity<List<Message>> getMessageByReceiver(@PathVariable(name = "login") String login) {
        Optional<User> user = userService.findByLogin(login);
        if (!user.isPresent()) return ResponseEntity.badRequest().build();
        List<Message> messages = new ArrayList<>();
        messages = messageService.findAllByReceiver(user.get());
        return ResponseEntity.ok(messages);
    }

}