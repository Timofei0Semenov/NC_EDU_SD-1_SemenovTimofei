package backend.service;

import backend.entity.Meeting;
import backend.entity.User;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface MeetingService {
    Meeting saveMeeting(Meeting meeting);

    Optional<Meeting> findMeetingById(Long id);

    List<Meeting> findAll();

    void deleteMeeting(Long id);

    List<Meeting> findAllByMember(User user);

    List<Meeting> findAllByPotentialMember(User user);

    List<Meeting> findAllByOwner(User user);
    }
