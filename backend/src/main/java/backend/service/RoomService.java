package backend.service;

import backend.entity.Room;

import java.util.List;
import java.util.Optional;

public interface RoomService {
    Room saveRoom(Room room);

    Optional<Room> findRoomById(Long id);

    List<Room> findAll();

    void deleteRoom(Long id);
}
