package backend.controller;

import backend.entity.Meeting;
import backend.entity.Room;
import backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    private RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping
    public Room saveRoom(@RequestBody Room room) {
        return roomService.saveRoom(room);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteRoom(@PathVariable(name = "id") Long id) {
        roomService.deleteRoom(id);
    }

    @GetMapping(value = "/all")
    public List<Room> getAllRooms() {
        return roomService.findAll();
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable(name = "id") Long id) {
        Optional<Room> room = roomService.findRoomById(id);
        return room.isPresent() ? ResponseEntity.ok(room.get()) : ResponseEntity.notFound().build();
    }

    @PostMapping(value = "/checkRoom")
    public ResponseEntity<String> checkRoom(@RequestBody Meeting newMeeting) {
        String answer = roomService.checkRoom(newMeeting.getRoom(), newMeeting.getStart(), newMeeting.getEnd());
        return ResponseEntity.ok(answer);
    }

    @PutMapping(value = "/updateRoom")
    public ResponseEntity updateRoom(@RequestBody Room room) {
        this.roomService.saveRoom(room);
        return ResponseEntity.ok().build();
    }
}
