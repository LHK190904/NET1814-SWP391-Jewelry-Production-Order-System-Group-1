package com.backendVn.SWP.dtos.request;

/**
 * DTO for {@link com.backendVn.SWP.entities.User}
 */
public class UserUpdateRequest {
    private String password;
    private String email;
    private String address;

    public UserUpdateRequest(String password, String email, String address) {
        this.password = password;
        this.email = email;
        this.address = address;
    }

    public UserUpdateRequest() {
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
