package com.backendVn.SWP.dtos.request;

import java.io.Serializable;
import java.util.Objects;

/**
 * DTO for {@link com.backendVn.SWP.entities.User}
 */
public class UserCreationRequest implements Serializable {
    private final String userName;
    private final String password;
    private final String email;
    private final String address;
    private final String title;

    public UserCreationRequest(String userName, String password, String email, String address, String title) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.address = address;
        this.title = title;
    }

    public String getUserName() {
        return userName;
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

    public String getTitle() {
        return title;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserCreationRequest entity = (UserCreationRequest) o;
        return Objects.equals(this.userName, entity.userName) &&
                Objects.equals(this.password, entity.password) &&
                Objects.equals(this.email, entity.email) &&
                Objects.equals(this.address, entity.address) &&
                Objects.equals(this.title, entity.title);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userName, password, email, address, title);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "userName = " + userName + ", " +
                "password = " + password + ", " +
                "email = " + email + ", " +
                "address = " + address + ", " +
                "title = " + title + ")";
    }
}