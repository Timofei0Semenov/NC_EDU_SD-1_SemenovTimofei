package fapi.controller;

import fapi.models.Meeting;
import fapi.models.User;
import fapi.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Meeting> createMeeting(@RequestBody Meeting meeting) {
        return ResponseEntity.ok(meetingService.createMeeting(meeting));
    }

    @DeleteMapping(value = "/{id}")
    public void deleteMeeting(@PathVariable Long id) {
        meetingService.deleteMeeting(id);
    }

    @GetMapping(value = "/byMember/{login}")
    public ResponseEntity<List<Meeting>> getAllByMember(@PathVariable(name = "login") String login) {
        return ResponseEntity.ok(meetingService.findAllByMember(login));
    }

    @GetMapping(value = "/byPotentialMember/{login}")
    public ResponseEntity<List<Meeting>> getAllByPotentialMember(@PathVariable(name = "login") String login) {
        return ResponseEntity.ok(meetingService.findAllByPotentialMember(login));
    }

    @GetMapping(value = "/byOwner/{login}")
    public ResponseEntity<List<Meeting>> getAllByOwner(@PathVariable(name = "login") String login) {
        return ResponseEntity.ok(meetingService.findAllByOwner(login));
    }

    @PostMapping(value = "/addMember/{idMeeting}")
    public void addMember(@RequestBody User input, @PathVariable Long idMeeting) {
        meetingService.addMember(input, idMeeting);
    }

    @PostMapping(value = "/addPotentialMember/{idMeeting}")
    public void addPotentialMember(@RequestBody User input, @PathVariable Long idMeeting) {
        meetingService.addPotentialMember(input, idMeeting);
    }

    @PostMapping(value = "/addNoMember/{idMeeting}")
    public void addNoMember(@RequestBody User input, @PathVariable Long idMeeting) {
        meetingService.addNoMember(input, idMeeting);
    }
}
