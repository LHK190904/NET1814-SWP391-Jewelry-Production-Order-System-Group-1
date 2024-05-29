package com.backendVn.SWP.services;

import com.backendVn.SWP.dtos.request.UserCreationRequest;
import com.backendVn.SWP.entities.User;
import com.backendVn.SWP.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id).
                orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User createUser(UserCreationRequest request) {
        User user = new User();

        if (userRepository.existsByUserName(request.getUserName()))
            throw new RuntimeException("User existed.");

        user.setUserName(request.getUserName());
        user.setPassword(request.getPassword());
        user.setEmail(request.getEmail());
        user.setAddress(request.getAddress());
        user.setTitle(request.getTitle());
        return userRepository.save(user);
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}