package fapi.service;

import fapi.models.Room;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface RoomService {
    Room saveRoom(Room room);

    Room findRoomById(Long id);

    List<Room> findAll();

    void deleteRoom(Long id);
}
