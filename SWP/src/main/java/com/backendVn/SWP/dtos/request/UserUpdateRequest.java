package com.backendVn.SWP.dtos.request;

/**
 * DTO for {@link com.backendVn.SWP.entities.User}
 */
public class UserUpdateRequest {
    private final String password;
    private final String email;
    private final String address;

    public UserUpdateRequest(String password, String email, String address) {
        this.password = password;
        this.email = email;
        this.address = address;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getAddress() {
        return address;
    }
}
