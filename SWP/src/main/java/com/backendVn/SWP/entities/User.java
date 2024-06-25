package com.backendVn.SWP.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID", nullable = false)
    private Integer id;

    @Size(max = 50)
    @NotNull
    @Nationalized
    @Column(name = "user_name", nullable = false, length = 50)
    private String userName;

    @Size(max = 225)
    @NotNull
    @Nationalized
    @Column(name = "Password", nullable = false, length = 225)
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

    @OneToMany(mappedBy = "updatedBy")
    private Set<Process> processes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "approveBy")
    private Set<Quotation> quotations = new LinkedHashSet<>();

    @OneToMany(mappedBy = "customerID")
    private Set<Request> requestsCustomer = new LinkedHashSet<>();

    @OneToMany(mappedBy = "saleStaffid")
    private Set<Request> requestsSale = new LinkedHashSet<>();

    @OneToMany(mappedBy = "designStaff")
    private Set<RequestOrder> requestOrdersDesign = new LinkedHashSet<>();

    @OneToMany(mappedBy = "productionStaff")
    private Set<RequestOrder> requestOrdersProduction = new LinkedHashSet<>();

}