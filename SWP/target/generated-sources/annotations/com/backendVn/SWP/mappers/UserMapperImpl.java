package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.UserCreationRequest;
import com.backendVn.SWP.dtos.request.UserUpdateRequest;
import com.backendVn.SWP.dtos.response.UserResponse;
import com.backendVn.SWP.entities.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toUser(UserCreationRequest userCreationRequest) {
        if ( userCreationRequest == null ) {
            return null;
        }

        User user = new User();

        user.setUserName( userCreationRequest.getUserName() );
        user.setPassword( userCreationRequest.getPassword() );
        user.setEmail( userCreationRequest.getEmail() );
        user.setAddress( userCreationRequest.getAddress() );
        user.setTitle( userCreationRequest.getTitle() );

        return user;
    }

    @Override
    public void updateUser(User user, UserUpdateRequest userUpdateRequest) {
        if ( userUpdateRequest == null ) {
            return;
        }

        user.setPassword( userUpdateRequest.getPassword() );
        user.setEmail( userUpdateRequest.getEmail() );
        user.setAddress( userUpdateRequest.getAddress() );
    }

    @Override
    public UserResponse toUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponse.UserResponseBuilder userResponse = UserResponse.builder();

        userResponse.id( user.getId() );
        userResponse.userName( user.getUserName() );
        userResponse.email( user.getEmail() );
        userResponse.address( user.getAddress() );
        userResponse.title( user.getTitle() );

        return userResponse.build();
    }
}
