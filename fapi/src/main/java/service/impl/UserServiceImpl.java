package service.impl;

import models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import service.UserService;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service("userService")
public class UserServiceImpl implements UserService, UserDetailsService {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByLogin(username);

    }

    @Override
    public User findByLogin(String login) {
        RestTemplate restTemplate = new RestTemplate();
        User user = restTemplate.getForObject(backendServerUrl + "users/login/" + login, User.class);
        return user;
    }

    @Override
    public User saveUser(User user) {
        RestTemplate restTemplate = new RestTemplate();
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return restTemplate.postForEntity(backendServerUrl + "users", user, User.class).getBody();
    }

    @Override
    public User findUserById(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        User user = restTemplate.getForObject(backendServerUrl + "users/id/" + id, User.class);
        return user;    }

    @Override
    public List<User> findAll() {
        RestTemplate restTemplate = new RestTemplate();
        User[] response = restTemplate.getForObject(backendServerUrl + "users/all", User[].class);
        return response == null ? Collections.emptyList() : Arrays.asList(response);
    }

    @Override
    public void deleteUser(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendServerUrl + "users/" + id);
    }
}
