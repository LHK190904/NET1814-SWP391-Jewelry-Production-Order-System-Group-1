package com.backendVn.SWP.controllers;

import com.backendVn.SWP.dtos.response.ApiResponse;
import com.backendVn.SWP.dtos.request.UserCreationRequest;
import com.backendVn.SWP.dtos.request.UserUpdateRequest;
import com.backendVn.SWP.dtos.response.UserResponse;
import com.backendVn.SWP.entities.User;
import com.backendVn.SWP.services.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminController {
    UserService userService;

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }

    public List<User> getAllUsers1() {
        return userService.getAllUsers1();
    }


    @GetMapping("/{userID}")
    public UserResponse getUserById(@PathVariable Integer userID) {
        return userService.getUserById(userID);
    }

    @PostMapping
    public ApiResponse<UserResponse> createUserRequest(@RequestBody @Valid UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(request))
                .build();
    }

    @PutMapping("/{id}")
    public UserResponse updateUser(@PathVariable Integer id,@RequestBody @Valid UserUpdateRequest userUpdateRequest) {
        return  userService.updateUser(id, userUpdateRequest);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }
}
