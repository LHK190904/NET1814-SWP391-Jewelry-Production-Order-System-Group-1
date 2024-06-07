package com.backendVn.SWP.dtos.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

/**
 * DTO for {@link com.backendVn.SWP.entities.User}
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults (level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
    @Size(min = 8,message = "INVALID_PASSWORD")
    String password;
    String email;
    String address;


}
