package backend.controller;

import backend.entity.Meeting;
import backend.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/meeting")
public class MeetingController {

    private MeetingService meetingService;

    @Autowired
    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Meeting> getAll(){
        return meetingService.findAll();
    }

    @RequestMapping(value = "/{id}")
    public void deleteMeeting(@PathVariable(name = "id") Integer id){
        meetingService.deleteMeeting(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Meeting saveMeeting(@RequestBody Meeting meeting){
        return meetingService.saveMeeting(meeting);
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Meeting> getMeetingById(@PathVariable(name = "id") Integer id) {
        Optional<Meeting> meeting = meetingService.findMeetingById(id);
        return meeting.isPresent() ? ResponseEntity.ok(meeting.get()) : ResponseEntity.notFound().build();
    }
}
