package com.backendVn.SWP.controllers;

import com.backendVn.SWP.entities.User;
import com.backendVn.SWP.repositories.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/find/{name}")
    public List<User> findUserByName(@PathVariable String name) {
        return userRepository.findByUserName(name);
    }
}
