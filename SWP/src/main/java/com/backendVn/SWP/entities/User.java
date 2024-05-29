package com.backendVn.SWP.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID", nullable = false)
    private Integer id;

    @Size(max = 50)
    @NotNull
    @Column(name = "user_name", nullable = false, length = 50)
    private String userName;

    @Size(max = 50)
    @NotNull
    @Column(name = "Password", nullable = false, length = 50)
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public Set<Request> getSaleRequests() {
        return saleRequests;
    }

    public void setSaleRequests(Set<Request> saleRequests) {
        this.saleRequests = saleRequests;
    }

    public Set<RequestOrder> getDesignRequestOrders() {
        return designRequestOrders;
    }

    public void setDesignRequestOrders(Set<RequestOrder> designRequestOrders) {
        this.designRequestOrders = designRequestOrders;
    }

    public Set<RequestOrder> getProduceRequestOrders() {
        return produceRequestOrders;
    }

    public void setProduceRequestOrders(Set<RequestOrder> produceRequestOrders) {
        this.produceRequestOrders = produceRequestOrders;
    }

}