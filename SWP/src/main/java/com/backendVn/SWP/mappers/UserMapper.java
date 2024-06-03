package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.CustomerRegisterRequest;
import com.backendVn.SWP.dtos.request.UserCreationRequest;
import com.backendVn.SWP.dtos.request.UserUpdateRequest;
import com.backendVn.SWP.dtos.response.UserResponse;
import com.backendVn.SWP.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest userCreationRequest);
    void updateUser(@MappingTarget User user, UserUpdateRequest userUpdateRequest);
    UserResponse toUserResponse(User user);
    User toUser(CustomerRegisterRequest customerRegisterRequest);
}
