package com.backendVn.SWP.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RequestID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CustomerID")
    private User customerID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sale_staffid")
    private User saleStaffid;

    @ColumnDefault("getdate()")
    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "recieved_at")
    private Instant recievedAt;

    @Column(name = "end_at")
    private Instant endAt;

    @Size(max = 50)
    @Nationalized
    @Column(name = "Status", length = 50)
    private String status;

    @NotNull
    @Nationalized
    @Lob
    @Column(name = "Description", nullable = false)
    private String description;

    @OneToMany(mappedBy = "requestID")
    private Set<Invoice> invoices = new LinkedHashSet<>();

    @OneToMany(mappedBy = "requestID")
    private Set<Payment> payments = new LinkedHashSet<>();

    @OneToMany(mappedBy = "requestID")
    private Set<Process> processes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "requestID")
    private Set<Quotation> quotations = new LinkedHashSet<>();

    @OneToMany(mappedBy = "requestID")
    private Set<RequestOrder> requestOrders = new LinkedHashSet<>();

}