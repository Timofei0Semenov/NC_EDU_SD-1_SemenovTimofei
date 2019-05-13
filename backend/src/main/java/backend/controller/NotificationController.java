package backend.controller;

import backend.entity.Notification;
import backend.entity.User;
import backend.service.NotificationService;
import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private NotificationService notificationService;
    private UserService userService;

    @Autowired
    public NotificationController(NotificationService notificationService, UserService userService) {
        this.notificationService = notificationService;
        this.userService = userService;
    }

    @GetMapping(value = "/all")
    public List<Notification> getAll() {
        return notificationService.findAll();
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity deleteNotification(@PathVariable(name = "id") Long id) {
        if (!notificationService.findNotificationById(id).isPresent()) return ResponseEntity.notFound().build();
        notificationService.deleteNotification(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public void saveNotification(@RequestBody Notification notification) {
        notificationService.saveNotification(notification);
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable(name = "id") @Min(value = 1) Long id) {
        Optional<Notification> notification = notificationService.findNotificationById(id);
        return notification.isPresent() ? ResponseEntity.ok(notification.get()) : ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/byOwner/{login}")
    public ResponseEntity<List<Notification>> getNotificationByReceiver(@PathVariable(name = "login") String login) {
        Optional<User> user = userService.findByLogin(login);
        if (!user.isPresent()) return ResponseEntity.badRequest().build();
        List<Notification> notifications = new ArrayList<>();
        notifications = notificationService.findAllByAlarmOwner(user.get());
        return ResponseEntity.ok(notifications);
    }
}
