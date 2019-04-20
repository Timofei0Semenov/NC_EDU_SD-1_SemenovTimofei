package fapi.controller;

import fapi.models.Message;
import fapi.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import java.util.List;

@RestController
@RequestMapping("/fapi/messages")
public class MessageController {

    private MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<Message>> getAll() {
        return ResponseEntity.ok(messageService.findAll());
    }

    @DeleteMapping(value = "/{id}")
    public void deleteMessage(@PathVariable(name = "id") @Min(value = 1) Long id) {
        messageService.deleteMessage(id);
    }

    @PostMapping
    public ResponseEntity saveMessage(@RequestBody Message message) {
        return message == null ? ResponseEntity.badRequest().build() : ResponseEntity.ok(messageService.saveMessage(message));
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable(name = "id") @Min(value = 1) Long id) {
        return ResponseEntity.ok(messageService.findMessageById(id));
    }

    @GetMapping(value = "/byReceiver/{login}")
    public ResponseEntity<List<Message>> getMessageByReceiver(@PathVariable(name = "login") String login) {
        return ResponseEntity.ok(messageService.findAllByReceiver(login));
    }
}
