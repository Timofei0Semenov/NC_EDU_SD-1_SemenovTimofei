package controller;

import models.Meeting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.MeetingService;

import java.util.List;

@RestController
@RequestMapping("/fapi/meetings")
public class MeetingController {

    private MeetingService meetingService;

    @Autowired
    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<Meeting> getMeetingById(@PathVariable Long id) {
        return ResponseEntity.ok(meetingService.findMeetingById(id));
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<Meeting>> getAllMeetings() {
        return ResponseEntity.ok(meetingService.findAll());
    }

    @PostMapping
    public ResponseEntity<Meeting> saveMeeting(@RequestBody Meeting meeting) {
        return ResponseEntity.ok(meetingService.saveMeeting(meeting));
    }

    @DeleteMapping(value = "/{id}")
    public void deleteMeeting(@PathVariable Long id) {
        meetingService.deleteMeeting(id);
    }
}
