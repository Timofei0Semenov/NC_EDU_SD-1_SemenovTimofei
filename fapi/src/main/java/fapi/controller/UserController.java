package fapi.controller;

import fapi.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import fapi.service.UserService;

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
    public ResponseEntity<User> saveUser(@RequestBody User user) {
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
}