package fapi.controller;

import fapi.models.User;
import fapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
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
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.saveUser(user));
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

    @PutMapping
    public void updateUser(@RequestBody User user) {
        userService.updateUser(user);
    }

    @GetMapping(value = "/byFriend/{id}")
    public ResponseEntity<List<User>> getFriends(@PathVariable(name = "id") @Min(value = 1) Long idUser) {
        return ResponseEntity.ok(userService.findByFriendsContains(idUser));
    }

    @RequestMapping(value = "/addFriend/{login}", method = RequestMethod.POST)
    public ResponseEntity addMember(@RequestBody User input, @PathVariable String login) {
        return userService.addFriend(input, login);
    }
}