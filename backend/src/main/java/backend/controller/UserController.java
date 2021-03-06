package backend.controller;

import backend.entity.Meeting;
import backend.entity.User;
import backend.service.MeetingService;
import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    private MeetingService meetingService;

    @Autowired
    public UserController(UserService userService, MeetingService meetingService) {
        this.userService = userService;
        this.meetingService = meetingService;
    }

    @GetMapping(value = "/login/{login}")
    public ResponseEntity<User> getUserByLogin(@PathVariable(name = "login") String login) {
        Optional<User> user = userService.findByLogin(login);
        return user.isPresent() ? ResponseEntity.ok(user.get()) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody User user) {
//        if (userService.findByLogin(user.getLogin()).isPresent() ||
//                userService.findByEmail(user.getEmail()).isPresent()) {
//            return ResponseEntity.badRequest().build();
//        } else {
//            userService.saveUser(user);
//            return ResponseEntity.ok(user);
//        }
        try {
            userService.saveUser(user);
            return ResponseEntity.ok().body("");
        } catch (DataIntegrityViolationException exp) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(exp.getMessage());
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity deleteUser(@PathVariable(name = "id") @Min(value = 1) Long id) {
        if (!userService.findUserById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/all")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(name = "id") @Min(value = 1) Long id) {
        Optional<User> user = userService.findUserById(id);
        return user.isPresent() ? ResponseEntity.ok(user.get()) : ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/byMeeting/{idMeeting}")
    public ResponseEntity<List<User>> getUsersByMeeting(@PathVariable(name = "idMeeting") @Min(value = 1) Long idMeeting) {
        Optional<Meeting> meeting = meetingService.findMeetingById(idMeeting);
        return ResponseEntity.ok(userService.findAllByMeeting(meeting.get()));
    }


    @GetMapping(value = "/byPotentialMeeting/{idMeeting}")
    public ResponseEntity<List<User>> getUsersByPotentialMeeting(@PathVariable(name = "idMeeting") @Min(value = 1) Long idMeeting) {
        Optional<Meeting> potentialMeeting = meetingService.findMeetingById(idMeeting);
        return ResponseEntity.ok(userService.findAllByPotentialMeetings(potentialMeeting.get()));
    }

    @GetMapping(value = "/byNoMeeting/{idMeeting}")
    public ResponseEntity<List<User>> getUsersByNoMeeting(@PathVariable(name = "idMeeting") @Min(value = 1) Long idMeeting) {
        Optional<Meeting> noMeeting = meetingService.findMeetingById(idMeeting);
        return ResponseEntity.ok(userService.findAllByNoMeetings(noMeeting.get()));
    }

    @GetMapping(value = "/byInvitedMeeting/{idMeeting}")
    public ResponseEntity<List<User>> getUsersByInvitedMeeting(@PathVariable(name = "idMeeting") @Min(value = 1) Long idMeeting) {
        Optional<Meeting> invitedMeeting = meetingService.findMeetingById(idMeeting);
        return ResponseEntity.ok(userService.findAllByInvitedMeetings(invitedMeeting.get()));
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        Optional<User> updateUser = userService.findUserById(user.getIdUser());
        if (!updateUser.isPresent()) return ResponseEntity.notFound().build();
        userService.saveUser(user);
        return ResponseEntity.ok(user);
    }

    @GetMapping(value = "/byFriend/{id}")
    public ResponseEntity<List<User>> getFriends(@PathVariable(name = "id") @Min(value = 1) Long idUser) {
        Optional<User> user = userService.findUserById(idUser);
        if (!user.isPresent()) return ResponseEntity.notFound().build();
        List<User> friends = userService.findByFriendsContains(user.get());
        return ResponseEntity.ok(friends);
    }

    @PostMapping(value = "/addFriend/{login}")
    public ResponseEntity addFriend(@RequestBody User input, @PathVariable String login) {
        Optional<User> user = userService.findUserById(input.getIdUser());
        if (!user.isPresent()) return ResponseEntity.notFound().build();
        Optional<User> friend = userService.findByLogin(login);
        if (!friend.isPresent()) return ResponseEntity.notFound().build();
        user.get().getFriends().add(friend.get());
        friend.get().getFriends().add(user.get());
        userService.saveUser(user.get());
        userService.saveUser(friend.get());
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/newFriends/{id}")
    public ResponseEntity<List<User>> getNotFriends(@PathVariable(name = "id") @Min(value = 1) Long idUser) {
        Optional<User> user = userService.findUserById(idUser);
        if (!user.isPresent()) return ResponseEntity.notFound().build();
        List<User> usersToFriend = userService.findAllByFriendsNotContains(user.get());
        usersToFriend.remove(user.get());
        List<User> waitingUsers = userService.findAllWaitingUsers(user.get());
        if (waitingUsers.isEmpty()) return ResponseEntity.ok(usersToFriend);
        for (User userWanted : waitingUsers) {
            usersToFriend.remove(userWanted);
        }
        return ResponseEntity.ok(usersToFriend);
    }

    @GetMapping(value = "/friendsForInviting/{idUser}/{idMeeting}")
    public ResponseEntity<List<User>> getFriendsForInviting(@PathVariable(name = "idUser") @Min(value = 1) Long idUser,
                                                            @PathVariable(name = "idMeeting") @Min(value = 1) Long idMeeting) {
        Optional<User> user = userService.findUserById(idUser);
        if (!user.isPresent()) return ResponseEntity.notFound().build();
        Optional<Meeting> meeting = meetingService.findMeetingById(idMeeting);
        if (!meeting.isPresent()) return ResponseEntity.notFound().build();
        List<User> friendsForInviting = userService.findByFriendsContains(user.get());
        List<User> friendsAlreadyInvited = userService.findAllByInvitedMeetings(meeting.get());
        if (friendsAlreadyInvited.isEmpty()) return ResponseEntity.ok(friendsForInviting);
        for (User user1 : friendsAlreadyInvited) {
            friendsForInviting.remove(user1);
        }
        return ResponseEntity.ok(friendsForInviting);
    }

    @GetMapping(value = "/waitingToFriend/{idUser}")
    public ResponseEntity<List<User>> getWaitingTiFriend(@PathVariable(name = "idUser") @Min(value = 1) Long idUser) {
        Optional<User> user = userService.findUserById(idUser);
        if (!user.isPresent()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(userService.findAllWaitingUsers(user.get()));
    }
}
