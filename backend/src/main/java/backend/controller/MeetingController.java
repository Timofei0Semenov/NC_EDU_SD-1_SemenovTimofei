package backend.controller;

import backend.entity.Meeting;
import backend.entity.User;
import backend.service.MeetingService;
import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/meetings")
public class MeetingController {

    private MeetingService meetingService;

    private UserService userService;

    @Autowired
    public MeetingController(MeetingService meetingService, UserService userService) {
        this.meetingService = meetingService;
        this.userService = userService;
    }

    @GetMapping(value = "/all")
    public List<Meeting> getAll() {
        return meetingService.findAll();
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity deleteMeeting(@PathVariable(name = "id") @Min(value = 1) Long id) {
        if (!meetingService.findMeetingById(id).isPresent()) return ResponseEntity.notFound().build();
        meetingService.deleteMeeting(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<Meeting> createMeeting(@RequestBody Meeting meeting) {
        if (meeting.getStart().after(meeting.getEnd())) return ResponseEntity.badRequest().build();
        meetingService.saveMeeting(meeting);
        return ResponseEntity.ok(meetingService.findMeetingById(meeting.getIdMeeting()).get());
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<Meeting> getMeetingById(@PathVariable(name = "id") @Min(value = 1) Long id) {
        Optional<Meeting> meeting = meetingService.findMeetingById(id);
        return meeting.isPresent() ? ResponseEntity.ok(meeting.get()) : ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/byMember/{login}")
    public ResponseEntity<List<Meeting>> getAllByMember(@PathVariable(name = "login") String login) {
        Optional<User> user = userService.findByLogin(login);
        if (!user.isPresent()) return ResponseEntity.badRequest().build();
        List<Meeting> meetings = new ArrayList<>();
        meetings = meetingService.findAllByMember(user.get());
        return ResponseEntity.ok(meetings);
    }

    @GetMapping(value = "/byOwner/{login}")
    public ResponseEntity<List<Meeting>> getAllByOwner(@PathVariable(name = "login") String login) {
        Optional<User> user = userService.findByLogin(login);
        if (!user.isPresent()) return ResponseEntity.badRequest().build();
        List<Meeting> meetings = new ArrayList<>();
        meetings = meetingService.findAllByOwner(user.get());
        return ResponseEntity.ok(meetings);
    }

    @PostMapping(value = "/addMember/{idMeeting}")
    public ResponseEntity addMember(@RequestBody User[] input, @PathVariable Long idMeeting) {
        Optional<Meeting> meeting = meetingService.findMeetingById(idMeeting);
        if (!meeting.isPresent()) return ResponseEntity.badRequest().build();
        for (User item : input) {
            Optional<User> user = userService.findByLogin(item.getLogin());
            if (!user.isPresent()) return ResponseEntity.badRequest().build();
            meeting.get().getMembers().add(user.get());
        }
        meetingService.saveMeeting(meeting.get());
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Meeting> updateUser(@RequestBody Meeting meeting) {
        Optional<Meeting> updateMeet = meetingService.findMeetingById(meeting.getIdMeeting());
        if (!updateMeet.isPresent()) return ResponseEntity.notFound().build();
        updateMeet.get().setStart(meeting.getStart());
        updateMeet.get().setEnd(meeting.getEnd());
        updateMeet.get().setTitle(meeting.getTitle());
        updateMeet.get().setRoom(meeting.getRoom());
        meetingService.saveMeeting(updateMeet.get());
        return ResponseEntity.ok(updateMeet.get());
    }
}
