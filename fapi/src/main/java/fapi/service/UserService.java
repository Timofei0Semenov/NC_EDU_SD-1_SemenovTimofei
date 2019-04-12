package fapi.service;

import fapi.models.User;

import java.util.List;

public interface UserService {
    User findByLogin(String login);

    User saveUser(User user);

    User findUserById(Long id);

    List<User> findAll();

    void deleteUser(Long id);
}
