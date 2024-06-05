package com.backendVn.SWP.entities;

import com.backendVn.SWP.enums.Title;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID", nullable = false)
    Integer id;

    @Size(max = 50)
    @NotNull
    @Column(name = "user_name", nullable = false, length = 225)
    String userName;

    @Size(max = 225)
    @NotNull
    @Column(name = "Password", nullable = false, length = 225)
    String password;

    @Size(max = 100)
    @Column(name = "Email", length = 100)
    String email;

    @Lob
    @Column(name = "Address")
    String address;

    @Size(max = 50)
    @Column(name = "Title", length = 50)
    Title title;

    @OneToMany(mappedBy = "updatedBy")
    Set<Process> processes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "approveBy")
    Set<Quotation> quotations = new LinkedHashSet<>();

    @OneToMany(mappedBy = "customerID")
    Set<Request> customerRequests = new LinkedHashSet<>();

    @OneToMany(mappedBy = "saleStaffID")
    Set<Request> saleRequests = new LinkedHashSet<>();

    @OneToMany(mappedBy = "designStaff")
    Set<RequestOrder> designRequestOrders = new LinkedHashSet<>();

    @OneToMany(mappedBy = "productionStaff")
    Set<RequestOrder> produceRequestOrders = new LinkedHashSet<>();
}