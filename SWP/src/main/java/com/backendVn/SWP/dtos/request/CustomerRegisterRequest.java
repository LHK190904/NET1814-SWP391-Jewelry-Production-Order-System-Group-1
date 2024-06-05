package com.backendVn.SWP.dtos.request;

import com.backendVn.SWP.enums.Title;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerRegisterRequest {
    @Size(min = 3,message = "INVALID_USERNAME")
    String userName;

    @Size(min = 8, message = "INVALID_PASSWORD")
    String password;
    String email;
    String address;
    Title title;
}
