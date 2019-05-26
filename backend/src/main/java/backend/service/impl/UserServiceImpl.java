package backend.service.impl;

import backend.entity.Meeting;
import backend.entity.Message;
import backend.entity.User;
import backend.repository.UserRepository;
import backend.service.MessageService;
import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageService messageService;

    @Override
    public Optional<User> findByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    @Override
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> findAllByMeeting(Meeting meeting) {
        return userRepository.findAllByMeetingsContains(meeting);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> findByFriendsContains(User user) {
        return userRepository.findByFriendsContains(user);
    }

    @Override
    public List<User> findAllByFriendsNotContains(User user) {
        return userRepository.findAllByFriendsNotContains(user);
    }

    @Override
    public List<User> findAllByPotentialMeetings(Meeting meeting) {
        return userRepository.findAllByPotentialMeetingsContains(meeting);
    }

    @Override
    public List<User> findAllByNoMeetings(Meeting meeting) {
        return userRepository.findAllByNoMeetingsContains(meeting);
    }

    @Override
    public List<User> findAllByInvitedMeetings(Meeting meeting) {
        return userRepository.findAllByInvitedMeetingsContains(meeting);
    }

    @Override
    public List<User> findAllWaitingUsers(User user) {
        List<Message> messages = messageService.findAllBySenderAndTargetEquals(user, "friend");
        ArrayList<User> waitingUsers = new ArrayList<>();
        for (Message message : messages) {
            waitingUsers.add(message.getReceiver());
        }
        return waitingUsers;
    }
}
