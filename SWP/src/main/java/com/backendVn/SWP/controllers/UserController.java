package com.backendVn.SWP.controllers;

import com.backendVn.SWP.dtos.request.UserCreationRequest;
import com.backendVn.SWP.dtos.request.UserUpdateRequest;
import com.backendVn.SWP.entities.User;
import com.backendVn.SWP.repositories.UserRepository;
import com.backendVn.SWP.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userID}")
    public User getUserById(@PathVariable Integer userID) {
        return userService.getUserById(userID);
    }

    @PostMapping
    public User createUserRequest(@RequestBody @Valid UserCreationRequest request) {
        return userService.createUser(request);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Integer id,@RequestBody UserUpdateRequest userUpdateRequest) {
        return  userService.updateUser(id, userUpdateRequest);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }
}
