package fapi.service.impl;

import fapi.models.Message;
import fapi.service.MessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Value("${backend.server.url}")
    private String backendServerUrl;


    @Override
    public Message saveMessage(Message message) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl + "messages/", message, Message.class).getBody();
    }

    @Override
    public Message findMessageById(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "messages/id/" + id, Message.class);
    }

    @Override
    public List<Message> findAll() {
        RestTemplate restTemplate = new RestTemplate();
        Message[] response = restTemplate.getForObject(backendServerUrl + "messages/all", Message[].class);
        return response == null ? Collections.emptyList() : Arrays.asList(response);
    }

    @Override
    public void deleteMessage(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendServerUrl + "messages/" + id);
    }

    @Override
    public List<Message> findAllByReceiver(String login) {
        RestTemplate restTemplate = new RestTemplate();
        Message[] response = restTemplate.getForObject(backendServerUrl + "messages/byReceiver/" + login, Message[].class);
        return response == null ? Collections.emptyList() : Arrays.asList(response);
    }
}
