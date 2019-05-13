package fapi.service;

import fapi.models.Notification;
import fapi.models.User;

import java.util.List;

public interface NotificationService {

    Notification saveNotification(Notification notification);

    Notification findNotificationById(Long id);

    List<Notification> findAll();

    void deleteNotification(Long id);

    List<Notification> findAllByOwner(String login);
}
