package com.backendVn.SWP.dtos.request;


import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationRequest {
    @Size(min = 3,message = "INVALID_USERNAME")
    String userName;

    @Size(min = 8, message = "INVALID_PASSWORD")
    String password;
}
