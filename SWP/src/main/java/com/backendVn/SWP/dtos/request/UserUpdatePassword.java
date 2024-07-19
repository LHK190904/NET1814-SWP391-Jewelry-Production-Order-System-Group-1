package com.backendVn.SWP.dtos.request;

import jakarta.validation.constraints.Size;

public class UserUpdatePassword {
    @Size(min = 8,message = "INVALID_PASSWORD")
    String password;
}
