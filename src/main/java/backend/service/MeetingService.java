package backend.service;

import backend.entity.Meeting;

import java.util.List;
import java.util.Optional;

public interface MeetingService {
    Meeting saveMeeting(Meeting meeting);
    Optional<Meeting> findMeetingById(Integer id);
    List<Meeting> findAll();
    void deleteMeetingById(Integer id);
}
