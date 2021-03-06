package fapi.service;

import fapi.models.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    User findByLogin(String login);

    ResponseEntity<String> saveUser(User user);

    User findUserById(Long id);

    List<User> findAll();

    void deleteUser(Long id);

    List<User> findAllByMeeting(Long idMeeting);

    List<User> findAllByPotentialMeeting(Long idMeeting);

    List<User> findAllByNoMeeting(Long idMeeting);

    List<User> findAllByInvitedMeeting(Long idMeeting);

    List<User> findByFriendsContains(Long id);

    void updateUser(User user);

    ResponseEntity addFriend(User user, String login);

    List<User> findByFriendsNotContains(Long id);

    List<User> getFriendsForInviting(Long idUser, Long idMeeting);

    List<User> findAllWaitingUsers(Long idUser);
}
