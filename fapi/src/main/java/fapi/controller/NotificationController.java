package fapi.controller;

import fapi.models.Notification;
import fapi.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import java.util.List;

@RestController
@RequestMapping("/fapi/notifications")
public class NotificationController {

    private NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<Notification>> getAll() {
        return ResponseEntity.ok(notificationService.findAll());
    }

    @DeleteMapping(value = "/{id}")
    public void deleteNotification(@PathVariable(name = "id") @Min(value = 1) Long id) {
        notificationService.deleteNotification(id);
    }

    @PostMapping
    public ResponseEntity saveNotification(@RequestBody Notification notification) {
        return notification == null ? ResponseEntity.badRequest().build() : ResponseEntity.ok(notificationService.saveNotification(notification));
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable(name = "id") @Min(value = 1) Long id) {
        return ResponseEntity.ok(notificationService.findNotificationById(id));
    }

    @GetMapping(value = "/byOwner/{login}")
    public ResponseEntity<List<Notification>> getNotificationByOwner(@PathVariable(name = "login") String login) {
        return ResponseEntity.ok(notificationService.findAllByOwner(login));
    }
}
