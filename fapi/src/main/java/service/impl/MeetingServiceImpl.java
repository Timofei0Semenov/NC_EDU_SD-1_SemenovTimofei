package service.impl;

import models.Meeting;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import service.MeetingService;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class MeetingServiceImpl implements MeetingService {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    @Override
    public Meeting saveMeeting(Meeting meeting) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl + "meetings", meeting, Meeting.class).getBody();
    }

    @Override
    public Meeting findMeetingById(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "id/" + id, Meeting.class);
    }

    @Override
    public List<Meeting> findAll() {
        RestTemplate restTemplate = new RestTemplate();
        Meeting[] response = restTemplate.getForObject(backendServerUrl + "meetings/all", Meeting[].class);
        return response == null ? Collections.emptyList() : Arrays.asList(response);
    }

    @Override
    public void deleteMeeting(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendServerUrl + "meetings/" + id);
    }
}
