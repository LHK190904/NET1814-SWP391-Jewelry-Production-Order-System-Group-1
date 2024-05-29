package com.backendVn.SWP.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
public class Quotation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "QuotationID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RequestID")
    private Request requestID;

    @ColumnDefault("getdate()")
    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "approved_at")
    private Instant approvedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approve_by")
    private User approveBy;

    @Column(name = "Cost", precision = 18, scale = 2)
    private BigDecimal cost;

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

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getApprovedAt() {
        return approvedAt;
    }

    public void setApprovedAt(Instant approvedAt) {
        this.approvedAt = approvedAt;
    }

    public User getApproveBy() {
        return approveBy;
    }

    public void setApproveBy(User approveBy) {
        this.approveBy = approveBy;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

}