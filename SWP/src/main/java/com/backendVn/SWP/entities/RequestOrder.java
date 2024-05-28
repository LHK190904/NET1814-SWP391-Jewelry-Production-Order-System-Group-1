package com.backendVn.SWP.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
public class RequestOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RequestOrderID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RequestID")
    private Request requestID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DesignID")
    private Design designID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DesignStaff")
    private User designStaff;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProductionStaff")
    private User productionStaff;

    @Column(name = "Status", length = 50)
    private String status;

    @ColumnDefault("getdate()")
    @Column(name = "CreatedAt")
    private Instant createdAt;

    @Column(name = "EndAt")
    private Instant endAt;

    @OneToMany(mappedBy = "requestOrderID")
    private Set<RequestOrderDetail> requestOrderDetails = new LinkedHashSet<>();

    @OneToOne(mappedBy = "requestOrderID")
    private WarrantyCard warrantyCard;

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

    public Set<RequestOrderDetail> getRequestOrderDetails() {
        return requestOrderDetails;
    }

    public void setRequestOrderDetails(Set<RequestOrderDetail> requestOrderDetails) {
        this.requestOrderDetails = requestOrderDetails;
    }

    public WarrantyCard getWarrantyCard() {
        return warrantyCard;
    }

    public void setWarrantyCard(WarrantyCard warrantyCard) {
        this.warrantyCard = warrantyCard;
    }

}