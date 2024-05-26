package com.backendVn.SWP.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Quotation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer quotationId;

//    @ManyToOne
//    @JoinColumn(name = "requestId")
    private Request request;

    private Date createdAt;
    private Date approvedAt;

//    @ManyToOne
//    @JoinColumn(name = "approveBy")
    private User approveBy;

    private Double cost;

    // Getters and Setters

    public Integer getQuotationId() {
        return quotationId;
    }

    public void setQuotationId(Integer quotationId) {
        this.quotationId = quotationId;
    }

    public Request getRequest() {
        return request;
    }

    public void setRequest(Request request) {
        this.request = request;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getApprovedAt() {
        return approvedAt;
    }

    public void setApprovedAt(Date approvedAt) {
        this.approvedAt = approvedAt;
    }

    public User getApproveBy() {
        return approveBy;
    }

    public void setApproveBy(User approveBy) {
        this.approveBy = approveBy;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }
}

