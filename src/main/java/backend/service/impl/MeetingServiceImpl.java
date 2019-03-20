package backend.service.impl;

import backend.entity.Meeting;
import backend.repository.MeetingRepository;
import backend.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MeetingServiceImpl implements MeetingService {

    @Autowired
    MeetingRepository meetingRepository;

    @Override
    public Meeting saveMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    @Override
    public Optional<Meeting> findMeetingById(Integer id) {
        return meetingRepository.findById(id);
    }

    @Override
    public List<Meeting> findAll() {
        return meetingRepository.findAll();
    }

    @Override
    public void deleteMeeting(Integer id) {
        meetingRepository.deleteById(id);
    }
}
