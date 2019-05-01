package fapi.service.impl;

import fapi.models.Meeting;
import fapi.models.User;
import fapi.service.MeetingService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class MeetingServiceImpl implements MeetingService {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    @Override
    public Meeting createMeeting(Meeting meeting) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl + "meetings/", meeting, Meeting.class).getBody();
    }

    @Override
    public Meeting findMeetingById(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "meetings/id/" + id, Meeting.class);
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

    @Override
    public List<Meeting> findAllByMember(String login) {
        RestTemplate restTemplate = new RestTemplate();
        Meeting[] response = restTemplate.getForObject(backendServerUrl + "meetings/byMember/" + login, Meeting[].class);
        return response == null ? Collections.emptyList() : Arrays.asList(response);
    }

    @Override
    public List<Meeting> findAllByOwner(String login) {
        RestTemplate restTemplate = new RestTemplate();
        Meeting[] response = restTemplate.getForObject(backendServerUrl + "meetings/byOwner/" + login, Meeting[].class);
        return response == null ? Collections.emptyList() : Arrays.asList(response);
    }

    @Override
    public void addMember(User input, Long idMeeting) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.postForEntity(backendServerUrl + "meetings/addMember/" + idMeeting, input, Meeting.class);
    }
}
