package fapi.service;

import fapi.models.Meeting;
import fapi.models.Room;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoomService {
    Room saveRoom(Room room);

    Room findRoomById(Long id);

    List<Room> findAll();

    void deleteRoom(Long id);

    String checkRoom(Meeting meeting);

    void updateRoom(Room room);
}
