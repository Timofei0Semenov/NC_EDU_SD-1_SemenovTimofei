package service;

import models.Room;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoomService {

    Room saveRoom(Room room);

    Room findRoomById(Long id);

    List<Room> findAll();

    void deleteRoom(Long id);
}
