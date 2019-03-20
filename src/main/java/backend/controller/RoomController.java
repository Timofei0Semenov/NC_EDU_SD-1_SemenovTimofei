package backend.controller;

import backend.entity.Room;
import backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/room")
public class RoomController {

    private RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public Room saveRoom(@RequestBody Room room) {
        return roomService.saveRoom(room);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteRoom(@PathVariable(name = "id") Integer id) {
        roomService.deleteRoom(id);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Room> getAllRooms() {
        return roomService.findAll();
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Room> getRoomById(@PathVariable(name = "id") Integer id) {
        Optional<Room> room = roomService.findRoomById(id);
        return room.isPresent() ? ResponseEntity.ok(room.get()) : ResponseEntity.notFound().build();
    }
}
