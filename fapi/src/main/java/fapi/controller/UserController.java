package fapi.controller;

import fapi.models.User;
import fapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/fapi/users")
public class UserController {

    private UserService userService;

    private BCryptPasswordEncoder encoder;

    public UserController(UserService userService, BCryptPasswordEncoder encoder) {
        this.userService = userService;
        this.encoder = encoder;
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/login/{login}")
    public ResponseEntity<User> getUserByLogin(@PathVariable String login) {
        return ResponseEntity.ok(userService.findByLogin(login));
    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return userService.saveUser(user);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }

    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @GetMapping(value = "/byMeeting/{idMeeting}")
    public ResponseEntity<List<User>> getUsersByMeeting(@PathVariable(name = "idMeeting") @Min(value = 1) Long idMeeting) {
        return ResponseEntity.ok(userService.findAllByMeeting(idMeeting));
    }

    @GetMapping(value = "/byPotentialMeeting/{idMeeting}")
    public ResponseEntity<List<User>> getUsersByPotentialMeeting(@PathVariable(name = "idMeeting") @Min(value = 1) Long idMeeting) {
        return ResponseEntity.ok(userService.findAllByPotentialMeeting(idMeeting));
    }

    @GetMapping(value = "/byNoMeeting/{idMeeting}")
    public ResponseEntity<List<User>> getUsersByNoMeeting(@PathVariable(name = "idMeeting") @Min(value = 1) Long idMeeting) {
        return ResponseEntity.ok(userService.findAllByNoMeeting(idMeeting));
    }

    @GetMapping(value = "/byInvitedMeeting/{idMeeting}")
    public ResponseEntity<List<User>> getUsersByInvitedMeeting(@PathVariable(name = "idMeeting") @Min(value = 1) Long idMeeting) {
        return ResponseEntity.ok(userService.findAllByInvitedMeeting(idMeeting));
    }

    @PutMapping
    public void updateUser(@RequestBody User user) {
        userService.updateUser(user);
    }

    @GetMapping(value = "/byFriend/{id}")
    public ResponseEntity<List<User>> getFriends(@PathVariable(name = "id") @Min(value = 1) Long idUser) {
        return ResponseEntity.ok(userService.findByFriendsContains(idUser));
    }

    @PostMapping(value = "/addFriend/{login}")
    public ResponseEntity addFriend(@RequestBody User input, @PathVariable String login) {
        return userService.addFriend(input, login);
    }

    @GetMapping(value = "/newFriends/{id}")
    public ResponseEntity<List<User>> getNotFriends(@PathVariable(name = "id") @Min(value = 1) Long idUser) {
        return ResponseEntity.ok(userService.findByFriendsNotContains(idUser));
    }

    @GetMapping(value = "/friendsForInviting/{idUser}/{idMeeting}")
    public ResponseEntity<List<User>> getFriendsForInviting(@PathVariable(name = "idUser") @Min(value = 1) Long idUser,
                                                            @PathVariable(name = "idMeeting") @Min(value = 1) Long idMeeting) {
        return ResponseEntity.ok(userService.getFriendsForInviting(idUser, idMeeting));
    }

    @GetMapping(value = "/waitingToFriend/{idUser}")
    public ResponseEntity<List<User>> getWaitingTiFriend(@PathVariable(name = "idUser") @Min(value = 1) Long idUser) {
        return ResponseEntity.ok(userService.findAllWaitingUsers(idUser));
    }
}
