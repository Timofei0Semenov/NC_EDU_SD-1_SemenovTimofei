package backend.service;

import backend.entity.Meeting;

import java.util.List;
import java.util.Optional;

public interface MeetingService {
    Meeting saveMeeting(Meeting meeting);

    Optional<Meeting> findMeetingById(Long id);

    List<Meeting> findAll();

    void deleteMeeting(Long id);
}
