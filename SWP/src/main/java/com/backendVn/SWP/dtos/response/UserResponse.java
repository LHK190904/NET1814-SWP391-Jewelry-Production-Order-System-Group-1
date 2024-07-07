package com.backendVn.SWP.dtos.response;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    Integer id;
    String userName;
    String password;
    String email;
    String address;
    String title;
    Boolean noPassword;
}
