package fapi.service.impl;

import fapi.models.User;
import fapi.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service(value = "userService")
public class UserServiceImpl implements UserService, UserDetailsService {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByLogin(username);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getLogin(),
                user.getPassword(), getAuthority(user));
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
        return authorities;
    }

    @Override
    public User findByLogin(String login) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "users/login/" + login, User.class);
    }

    @Override
    public ResponseEntity<String> saveUser(User user) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.postForEntity(backendServerUrl + "users/", user, String.class).getBody();
            return ResponseEntity.ok().body("");
        } catch (HttpClientErrorException exp) {
            String response = "Invaild value";
            if (exp.getResponseBodyAsString().contains("userLogin_UNIQUE")) {
                response = "User with such login already exist";
            } else if (exp.getResponseBodyAsString().contains("email")) {
                response = "User with such email already exist";
            }
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }
    }

    @Override
    public User findUserById(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "users/id/" + id, User.class);
    }

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

    @Override
    public List<User> findAllByMeeting(Long idMeeting) {
        RestTemplate restTemplate = new RestTemplate();
        User[] response = restTemplate.getForObject(backendServerUrl + "users/byMeeting/" + idMeeting, User[].class);
        return response == null ? Collections.emptyList() : Arrays.asList(response);
    }

    @Override
    public List<User> findAllByPotentialMeeting(Long idMeeting) {
        RestTemplate restTemplate = new RestTemplate();
        User[] response = restTemplate.getForObject(backendServerUrl + "users/byPotentialMeeting/" + idMeeting, User[].class);
        return response == null ? Collections.emptyList() : Arrays.asList(response);
    }

    @Override
    public List<User> findAllByNoMeeting(Long idMeeting) {
        RestTemplate restTemplate = new RestTemplate();
        User[] response = restTemplate.getForObject(backendServerUrl + "users/byNoMeeting/" + idMeeting, User[].class);
        return response == null ? Collections.emptyList() : Arrays.asList(response);
    }

    @Override
    public List<User> findAllByInvitedMeeting(Long idMeeting) {
        RestTemplate restTemplate = new RestTemplate();
        User[] response = restTemplate.getForObject(backendServerUrl + "users/byInvitedMeeting/" + idMeeting, User[].class);
        return response == null ? Collections.emptyList() : Arrays.asList(response);
    }

    @Override
    public void updateUser(User user) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.put(backendServerUrl + "users/", user, User.class);
    }

    @Override
    public List<User> findByFriendsContains(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        User[] response = restTemplate.getForObject(backendServerUrl + "users/byFriend/" + id, User[].class);
        return response == null ? Collections.emptyList() : Arrays.asList(response);
    }

    @Override
    public ResponseEntity addFriend(User user, String login) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl + "users/addFriend/" + login, user, ResponseEntity.class);
    }

    @Override
    public List<User> findByFriendsNotContains(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        User[] response = restTemplate.getForObject(backendServerUrl + "users/newFriends/" + id, User[].class);
        return response == null ? Collections.emptyList() : Arrays.asList(response);
    }

    @Override
    public List<User> getFriendsForInviting(Long idUser, Long idMeeting) {
        RestTemplate restTemplate = new RestTemplate();
        User[] response = restTemplate.getForObject(backendServerUrl + "users/friendsForInviting/" + idUser + "/" + idMeeting,
                User[].class);
        return response == null ? Collections.emptyList() : Arrays.asList(response);
    }

    @Override
    public List<User> findAllWaitingUsers(Long idUser) {
        RestTemplate restTemplate = new RestTemplate();
        User[] response = restTemplate.getForObject(backendServerUrl + "users/waitingToFriend/" + idUser, User[].class);
        return response == null ? Collections.emptyList() : Arrays.asList(response);
    }
}
