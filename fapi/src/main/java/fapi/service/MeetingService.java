package fapi.service;

import fapi.models.Meeting;
import fapi.models.User;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface MeetingService {
    Meeting createMeeting(Meeting meeting);

    Meeting findMeetingById(Long id);

    List<Meeting> findAll();

    void deleteMeeting(Long id);

    List<Meeting> findAllByMember(String login);

    List<Meeting> findAllByOwner(String login);

    void addMember(User input, Long idMeeting);
}
