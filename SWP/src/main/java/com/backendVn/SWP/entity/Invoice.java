package com.backendVn.SWP.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;
import java.util.List;

@Entity
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer invoiceId;

//    @ManyToOne
//    @JoinColumn(name = "requestId")
    private Request request;

    private Date createdAt;
    private Double totalCost;

//    @OneToMany(mappedBy = "invoice")
    private List<InvoiceDetail> invoiceDetails;

    // Getters and Setters
}
