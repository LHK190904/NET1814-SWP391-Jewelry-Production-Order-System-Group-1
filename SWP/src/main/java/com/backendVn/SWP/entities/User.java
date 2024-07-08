package com.backendVn.SWP.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Nationalized;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "Users")
public class User {
    @Id
    @Column(name = "UserID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Size(max = 50)
    @NotNull
    @Nationalized
    @Column(name = "user_name", nullable = false, length = 50)
    private String userName;


    @Nationalized
    @Column(name = "Password", length = 225)
    private String password;

    @Size(max = 100)
    @Nationalized
    @Column(name = "Email", length = 100)
    private String email;

    @Nationalized
    @Lob
    @Column(name = "Address")
    private String address;

    @Size(max = 50)
    @Nationalized
    @Column(name = "Title", length = 50)
    private String title;

}