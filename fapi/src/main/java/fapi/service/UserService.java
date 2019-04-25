package fapi.service;

import fapi.models.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    User findByLogin(String login);

    User saveUser(User user);

    User findUserById(Long id);

    List<User> findAll();

    void deleteUser(Long id);

    List<User> findAllByMeeting(Long idMeeting);

    List<User> findByFriendsContains(Long id);

    void updateUser(User user);

    ResponseEntity addFriend(User user, String login);

    List<User> findByFriendsNotContains(Long id);
}
