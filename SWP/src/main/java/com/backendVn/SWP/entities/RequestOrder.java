package com.backendVn.SWP.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Entity
@Table(name = "request_order")
public class RequestOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_orderid", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RequestID")
    private Request requestID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DesignID")
    private Design designID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "design_staff")
    private User designStaff;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "production_staff")
    private User productionStaff;

    @Size(max = 50)
    @Column(name = "Status", length = 50)
    private String status;

    @ColumnDefault("getdate()")
    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "end_at")
    private Instant endAt;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Request getRequestID() {
        return requestID;
    }

    public void setRequestID(Request requestID) {
        this.requestID = requestID;
    }

    public Design getDesignID() {
        return designID;
    }

    public void setDesignID(Design designID) {
        this.designID = designID;
    }

    public User getDesignStaff() {
        return designStaff;
    }

    public void setDesignStaff(User designStaff) {
        this.designStaff = designStaff;
    }

    public User getProductionStaff() {
        return productionStaff;
    }

    public void setProductionStaff(User productionStaff) {
        this.productionStaff = productionStaff;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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