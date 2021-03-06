package fapi.controller;

import fapi.models.Meeting;
import fapi.models.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import fapi.service.RoomService;

import java.util.List;

@RestController
@RequestMapping("/fapi/rooms")
public class RoomController {

    private RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        return ResponseEntity.ok(roomService.findRoomById(id));
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.findAll());
    }

    @PostMapping
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<Room> saveRoom(@RequestBody Room room) {
        return ResponseEntity.ok(roomService.saveRoom(room));
    }

    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasRole('admin')")
    public void deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
    }

    @PostMapping(value = "/checkRoom")
    public ResponseEntity<String> checkRoom(@RequestBody Meeting meeting) {
        return ResponseEntity.ok(roomService.checkRoom(meeting));
    }

    @PutMapping(value = "/updateRoom")
    @PreAuthorize("hasRole('admin')")
    public void updateRoom(@RequestBody Room room) {
        roomService.updateRoom(room);
    }
}
