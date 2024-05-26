package com.backendVn.SWP.entity;

import jakarta.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    private String userName;
    private String password;
    private String email;
    private String address;

    @Enumerated(EnumType.STRING)
    private Role role;

    // Getters and Setters
}

enum Role {
    CUSTOMER, SALESTAFF, DESIGNSTAFF, PRODUCTIONSTAFF, ADMIN
}
