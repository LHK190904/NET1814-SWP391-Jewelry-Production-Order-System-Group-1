package com.backendVn.SWP.entities;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class RequestOrderDetail {
    @EmbeddedId
    private RequestOrderDetailId id;

    @MapsId("materialID")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MaterialID", nullable = false)
    private Material materialID;

    @MapsId("requestOrderID")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "RequestOrderID", nullable = false)
    private RequestOrder requestOrderID;

    @Column(name = "Weight", precision = 18, scale = 2)
    private BigDecimal weight;

    public RequestOrderDetailId getId() {
        return id;
    }

    public void setId(RequestOrderDetailId id) {
        this.id = id;
    }

    public Material getMaterialID() {
        return materialID;
    }

    public void setMaterialID(Material materialID) {
        this.materialID = materialID;
    }

    public RequestOrder getRequestOrderID() {
        return requestOrderID;
    }

    public void setRequestOrderID(RequestOrder requestOrderID) {
        this.requestOrderID = requestOrderID;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

}