package backend.service.impl;

import backend.entity.User;
import backend.repository.UserRepository;
import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    @Override
    public Optional<User> findUserById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
