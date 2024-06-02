package com.backendVn.SWP.services;

import com.backendVn.SWP.dtos.request.UserCreationRequest;
import com.backendVn.SWP.dtos.request.UserUpdateRequest;
import com.backendVn.SWP.dtos.response.UserResponse;
import com.backendVn.SWP.entities.User;
import com.backendVn.SWP.exception.AppException;
import com.backendVn.SWP.exception.ErrorCode;
import com.backendVn.SWP.mappers.UserMapper;
import com.backendVn.SWP.repositories.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;


    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse).toList();
    }

    public List<User> getAllUsers1() {
        return userRepository.findAll();
    }

    public UserResponse getUserById(Integer id) {
        return userMapper.toUserResponse(userRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("User not found")));
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User createUser(UserCreationRequest request) {
        if (userRepository.existsByUserName(request.getUserName()))
            throw new AppException(ErrorCode.USER_EXISTED);
        User user = userMapper.toUser(request);


        return userRepository.save(user);
    }

    public UserResponse updateUser(Integer id ,UserUpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userMapper.updateUser(user, request);
        return userMapper.toUserResponse(userRepository.save(user));
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}