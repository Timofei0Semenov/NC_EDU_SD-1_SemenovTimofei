package backend.service;

import backend.entity.Notification;
import backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface NotificationService {

    Notification saveNotification(Notification notification);

    Optional<Notification> findNotificationById(Long id);

    List<Notification> findAll();

    void deleteNotification(Long id);

    List<Notification> findAllByAlarmOwner(User user);
}
