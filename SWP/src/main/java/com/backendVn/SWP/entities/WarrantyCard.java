package com.backendVn.SWP.entities;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
public class WarrantyCard {
    @Id
    @Column(name = "RequestOrderID", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "RequestOrderID", nullable = false)
    private RequestOrder requestOrder;

    @Column(name = "CreatedAt")
    private Instant createdAt;

    @Column(name = "EndAt")
    private Instant endAt;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public RequestOrder getRequestOrder() {
        return requestOrder;
    }

    public void setRequestOrder(RequestOrder requestOrder) {
        this.requestOrder = requestOrder;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getEndAt() {
        return endAt;
    }

    public void setEndAt(Instant endAt) {
        this.endAt = endAt;
    }

}