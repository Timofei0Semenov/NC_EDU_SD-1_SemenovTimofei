package backend.service.impl;

import backend.entity.Meeting;
import backend.entity.Room;
import backend.repository.RoomRepository;
import backend.service.MeetingService;
import backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private MeetingService meetingService;

    @Override
    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public Optional<Room> findRoomById(Long id) {
        return roomRepository.findById(id);
    }

    @Override
    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    @Override
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    @Override
    public String checkRoom(Room room, Date start, Date end) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("d MMM yyyy HH:mm", new Locale("en"));
        List<Meeting> meetings = new ArrayList<>();
        meetings = meetingService.findAllByRoom(room);
        if (meetings.isEmpty()) return "Room is free special for you!♥";
        for (Meeting meeting : meetings) {
            if ((start.after(meeting.getStart()) && start.before(meeting.getEnd())) ||
                    (end.after(meeting.getStart()) && end.before(meeting.getEnd())) ||
                    (start.before(meeting.getStart()) && end.after(meeting.getEnd()))) {
                return "This room isn't available from " + dateFormat.format(meeting.getStart()) +
                        " to " + dateFormat.format(meeting.getEnd());
            }
        }
        return "Room is free special for you!♥";
    }
}
