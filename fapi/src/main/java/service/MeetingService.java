package service;

import models.Meeting;

import java.util.List;

public interface MeetingService {
    Meeting saveMeeting(Meeting meeting);

    Meeting findMeetingById(Long id);

    List<Meeting> findAll();

    void deleteMeeting(Long id);
}
