package fapi.service.impl;

import fapi.models.Notification;
import fapi.service.NotificationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    @Override
    public Notification saveNotification(Notification notification) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl + "notifications/", notification, Notification.class).getBody();
    }

    @Override
    public Notification findNotificationById(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "notifications/id/" + id, Notification.class);
    }

    @Override
    public List<Notification> findAll() {
        RestTemplate restTemplate = new RestTemplate();
        Notification[] response = restTemplate.getForObject(backendServerUrl + "notifications/all", Notification[].class);
        return response == null ? Collections.emptyList() : Arrays.asList(response);
    }

    @Override
    public void deleteNotification(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendServerUrl + "notifications/" + id);
    }

    @Override
    public List<Notification> findAllByOwner(String login) {
        RestTemplate restTemplate = new RestTemplate();
        Notification[] response = restTemplate.getForObject(backendServerUrl + "notifications/byOwner/" + login, Notification[].class);
        return response == null ? Collections.emptyList() : Arrays.asList(response);
    }
}
