package com.backendVn.SWP.dtos.response;


import com.backendVn.SWP.enums.Title;
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
    Title title;
}
