package service.impl;

import models.Room;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import service.RoomService;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class RoomServiceImpl implements RoomService {

    @Value("${backend.server.url")
    private String backendServerUrl;

    @Override
    public Room saveRoom(Room room) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl + "rooms", room, Room.class).getBody();
    }

    @Override
    public Room findRoomById(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "rooms/id/" + id, Room.class);
    }

    @Override
    public List<Room> findAll() {
        RestTemplate restTemplate = new RestTemplate();
        Room[] response = restTemplate.getForObject(backendServerUrl + "rooms/all", Room[].class);
        return response == null ? Collections.emptyList() : Arrays.asList(response);
    }

    @Override
    public void deleteRoom(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendServerUrl + "rooms/" + id);
    }
}
