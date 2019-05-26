package backend.controller;

import backend.entity.Meeting;
import backend.entity.User;
import backend.service.MeetingService;
import backend.service.RoomService;
import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@RestController
@RequestMapping("/meetings")
public class MeetingController {

    private MeetingService meetingService;

    private UserService userService;

    private RoomService roomService;

    @Autowired
    public MeetingController(MeetingService meetingService, UserService userService, RoomService roomService) {
        this.meetingService = meetingService;
        this.userService = userService;
        this.roomService = roomService;
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
        if (!this.roomService.checkRoom(meeting.getRoom(), meeting.getStart(), meeting.getEnd()).equals("Room is free special for you!♥")) {
            return ResponseEntity.badRequest().build();
        }
        meeting.setOwner(userService.findUserById(meeting.getOwner().getIdUser()).get());
        meetingService.saveMeeting(meeting);
        meeting.getMembers().add(meeting.getOwner());
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

    @GetMapping(value = "/byPotentialMember/{login}")
    public ResponseEntity<List<Meeting>> getAllByPotentialMember(@PathVariable(name = "login") String login) {
        Optional<User> user = userService.findByLogin(login);
        if (!user.isPresent()) return ResponseEntity.badRequest().build();
        List<Meeting> potentialMeetings = new ArrayList<>();
        potentialMeetings = meetingService.findAllByPotentialMember(user.get());
        return ResponseEntity.ok(potentialMeetings);
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
    public ResponseEntity addMember(@RequestBody User input, @PathVariable Long idMeeting) {
        Optional<Meeting> meeting = meetingService.findMeetingById(idMeeting);
        if (!meeting.isPresent()) return ResponseEntity.badRequest().build();
        Optional<User> user = userService.findByLogin(input.getLogin());
        if (!user.isPresent()) return ResponseEntity.badRequest().build();
        meeting.get().getMembers().add(user.get());
        meetingService.saveMeeting(meeting.get());
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/addPotentialMember/{idMeeting}")
    public ResponseEntity addPotentialMember(@RequestBody User input, @PathVariable Long idMeeting) {
        Optional<Meeting> potentialMeeting = meetingService.findMeetingById(idMeeting);
        if (!potentialMeeting.isPresent()) return ResponseEntity.badRequest().build();
        Optional<User> user = userService.findByLogin(input.getLogin());
        if (!user.isPresent()) return ResponseEntity.badRequest().build();
        potentialMeeting.get().getPotentialMembers().add(user.get());
        meetingService.saveMeeting(potentialMeeting.get());
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/addNoMember/{idMeeting}")
    public ResponseEntity addNoMember(@RequestBody User input, @PathVariable Long idMeeting) {
        Optional<Meeting> noMeeting = meetingService.findMeetingById(idMeeting);
        if (!noMeeting.isPresent()) return ResponseEntity.badRequest().build();
        Optional<User> user = userService.findByLogin(input.getLogin());
        if (!user.isPresent()) return ResponseEntity.badRequest().build();
        noMeeting.get().getNoMembers().add(user.get());
        meetingService.saveMeeting(noMeeting.get());
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/updateMeeting/{idMeeting}")
    public ResponseEntity updateMeeting(@RequestBody Meeting meeting, @PathVariable Long idMeeting) {
        Optional<Meeting> updateMeet = meetingService.findMeetingById(idMeeting);
        if (!updateMeet.isPresent()) return ResponseEntity.notFound().build();
        SimpleDateFormat dateFormat = new SimpleDateFormat("d MMM yyyy HH:mm", new Locale("en"));
        String busyByMe = "This room isn't available from " + dateFormat.format(updateMeet.get().getStart()) +
                " to " + dateFormat.format(updateMeet.get().getEnd()) + " by " + meeting.getTitle();
        String checkAnswer = this.roomService.checkRoom(meeting.getRoom(), meeting.getStart(), meeting.getEnd());
        if (!checkAnswer.equals("Room is free special for you!♥") && !checkAnswer.equals(busyByMe)) {
                return ResponseEntity.badRequest().build();
        }
        updateMeet.get().setStart(meeting.getStart());
        updateMeet.get().setEnd(meeting.getEnd());
        updateMeet.get().setTitle(meeting.getTitle());
        updateMeet.get().setRoom(meeting.getRoom());
        meetingService.saveMeeting(updateMeet.get());
        return ResponseEntity.ok().build();
    }
}
