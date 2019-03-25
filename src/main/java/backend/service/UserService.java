package backend.service;

import backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> findByLogin(String login);

    User saveUser(User user);

    Optional<User> findUserById(Integer id);

    List<User> findAll();

    void deleteUser(Integer id);
}