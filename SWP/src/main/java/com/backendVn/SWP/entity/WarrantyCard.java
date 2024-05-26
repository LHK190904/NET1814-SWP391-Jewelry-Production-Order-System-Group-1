package com.backendVn.SWP.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class WarrantyCard {
    @Id
    private Integer requestOrderId;

    private Date createdAt;
    private Date endAt;

//    @OneToOne
//    @MapsId
//    @JoinColumn(name = "requestOrderId")
    private RequestOrder requestOrder;

    public Integer getRequestOrderId() {
        return requestOrderId;
    }

    public void setRequestOrderId(Integer requestOrderId) {
        this.requestOrderId = requestOrderId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getEndAt() {
        return endAt;
    }

    public void setEndAt(Date endAt) {
        this.endAt = endAt;
    }

    public RequestOrder getRequestOrder() {
        return requestOrder;
    }

    public void setRequestOrder(RequestOrder requestOrder) {
        this.requestOrder = requestOrder;
    }
// Getters and Setters
}
