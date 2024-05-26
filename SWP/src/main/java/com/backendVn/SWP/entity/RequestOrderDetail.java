package com.backendVn.SWP.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class RequestOrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer requestOrderDetailId;

//    @ManyToOne
//    @JoinColumn(name = "materialId")
    private Material material;

//    @ManyToOne
//    @JoinColumn(name = "requestOrderId")
    private RequestOrder requestOrder;

    private Double weight;

    public Integer getRequestOrderDetailId() {
        return requestOrderDetailId;
    }

    public void setRequestOrderDetailId(Integer requestOrderDetailId) {
        this.requestOrderDetailId = requestOrderDetailId;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public RequestOrder getRequestOrder() {
        return requestOrder;
    }

    public void setRequestOrder(RequestOrder requestOrder) {
        this.requestOrder = requestOrder;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }
// Getters and Setters
}
