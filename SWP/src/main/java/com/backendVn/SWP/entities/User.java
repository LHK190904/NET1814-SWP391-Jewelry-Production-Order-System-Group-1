package com.backendVn.SWP.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID", nullable = false)
    private Integer id;

    @Size(max = 50)
    @NotNull
    @Column(name = "user_name", nullable = false, length = 225)
    private String userName;

    @Size(max = 225)
    @NotNull
    @Column(name = "Password", nullable = false, length = 225)
    private String password;

    @Size(max = 100)
    @Column(name = "Email", length = 100)
    private String email;

    @Lob
    @Column(name = "Address")
    private String address;

    @Size(max = 50)
    @Column(name = "Title", length = 50)
    private String title;

    @OneToMany(mappedBy = "updatedBy")
    private Set<Process> processes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "approveBy")
    private Set<Quotation> quotations = new LinkedHashSet<>();

    @OneToMany(mappedBy = "customerID")
    private Set<Request> customerRequests = new LinkedHashSet<>();

    @OneToMany(mappedBy = "saleStaffID")
    private Set<Request> saleRequests = new LinkedHashSet<>();

    @OneToMany(mappedBy = "designStaff")
    private Set<RequestOrder> designRequestOrders = new LinkedHashSet<>();

    @OneToMany(mappedBy = "productionStaff")
    private Set<RequestOrder> produceRequestOrders = new LinkedHashSet<>();


}