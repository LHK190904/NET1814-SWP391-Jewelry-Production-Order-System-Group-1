package com.backendVn.SWP.entities;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "\"User\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID", nullable = false)
    private String id;

    @Column(name = "UserName", nullable = false, length = 50)
    private String userName;

    @Column(name = "Password", nullable = false, length = 50)
    private String password;

    @Column(name = "Email", length = 100)
    private String email;

    @Lob
    @Column(name = "Address")
    private String address;

    @Column(name = "Title", length = 50)
    private String title;

    @OneToMany(mappedBy = "updatedBy")
    private Set<Process> processes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "approveBy")
    private Set<Quotation> quotations = new LinkedHashSet<>();

    @OneToMany(mappedBy = "customerID")
    private Set<Request> customerRequests = new LinkedHashSet<>();

    @OneToMany(mappedBy = "saleStaffID")
    private Set<Request> saleStaffRequests = new LinkedHashSet<>();

    @OneToMany(mappedBy = "designStaff")
    private Set<RequestOrder> designStaffRequestOrders = new LinkedHashSet<>();

    @OneToMany(mappedBy = "productionStaff")
    private Set<RequestOrder> productionStaffRequestOrders = new LinkedHashSet<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public Set<Request> getCustomerRequests() {
        return customerRequests;
    }

    public void setCustomerRequests(Set<Request> customerRequests) {
        this.customerRequests = customerRequests;
    }

    public Set<Request> getSaleStaffRequests() {
        return saleStaffRequests;
    }

    public void setSaleStaffRequests(Set<Request> saleStaffRequests) {
        this.saleStaffRequests = saleStaffRequests;
    }

    public Set<RequestOrder> getDesignStaffRequestOrders() {
        return designStaffRequestOrders;
    }

    public void setDesignStaffRequestOrders(Set<RequestOrder> designStaffRequestOrders) {
        this.designStaffRequestOrders = designStaffRequestOrders;
    }

    public Set<RequestOrder> getProductionStaffRequestOrders() {
        return productionStaffRequestOrders;
    }

    public void setProductionStaffRequestOrders(Set<RequestOrder> productionStaffRequestOrders) {
        this.productionStaffRequestOrders = productionStaffRequestOrders;
    }

}