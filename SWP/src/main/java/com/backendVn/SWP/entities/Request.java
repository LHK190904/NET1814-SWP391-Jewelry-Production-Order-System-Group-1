package com.backendVn.SWP.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RequestID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "CustomerID", nullable = false)
    private User customerID;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "SaleStaffID", nullable = false)
    private User saleStaffID;

    @ColumnDefault("getdate()")
    @Column(name = "CreatedAt")
    private Instant createdAt;

    @Column(name = "RecievedAt")
    private Instant recievedAt;

    @Column(name = "EndAt")
    private Instant endAt;

    @Column(name = "Status", length = 50)
    private String status;

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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getCustomerID() {
        return customerID;
    }

    public void setCustomerID(User customerID) {
        this.customerID = customerID;
    }

    public User getSaleStaffID() {
        return saleStaffID;
    }

    public void setSaleStaffID(User saleStaffID) {
        this.saleStaffID = saleStaffID;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getRecievedAt() {
        return recievedAt;
    }

    public void setRecievedAt(Instant recievedAt) {
        this.recievedAt = recievedAt;
    }

    public Instant getEndAt() {
        return endAt;
    }

    public void setEndAt(Instant endAt) {
        this.endAt = endAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<Invoice> getInvoices() {
        return invoices;
    }

    public void setInvoices(Set<Invoice> invoices) {
        this.invoices = invoices;
    }

    public Set<Payment> getPayments() {
        return payments;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
    }

    public Set<Process> getProcesses() {
        return processes;
    }

    public void setProcesses(Set<Process> processes) {
        this.processes = processes;
    }

    public Set<Quotation> getQuotations() {
        return quotations;
    }

    public void setQuotations(Set<Quotation> quotations) {
        this.quotations = quotations;
    }

    public Set<RequestOrder> getRequestOrders() {
        return requestOrders;
    }

    public void setRequestOrders(Set<RequestOrder> requestOrders) {
        this.requestOrders = requestOrders;
    }

}