package backend.service;

import backend.entity.Meeting;
import backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> findByLogin(String login);

    User saveUser(User user);

    Optional<User> findUserById(Long id);

    List<User> findAll();

    void deleteUser(Long id);

    List<User> findAllByMeeting(Meeting meeting);

    List<User> findAllByPotentialMeetings(Meeting meeting);

    List<User> findAllByNoMeetings(Meeting meeting);

    Optional<User> findByEmail(String email);

    List<User> findByFriendsContains(User user);

    List<User> findAllByFriendsNotContains(User user);
}