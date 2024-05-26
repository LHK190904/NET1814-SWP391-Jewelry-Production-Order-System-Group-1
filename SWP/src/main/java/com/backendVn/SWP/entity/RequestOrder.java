package com.backendVn.SWP.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;
import java.util.List;

@Entity
public class RequestOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer requestOrderId;

//    @ManyToOne
//    @JoinColumn(name = "requestId")
    private Request request;

//    @ManyToOne
//    @JoinColumn(name = "designId")
    private Design design;

//    @ManyToOne
//    @JoinColumn(name = "designStaff")
    private User designStaff;

//    @ManyToOne
//    @JoinColumn(name = "productionStaff")
    private User productionStaff;

    private String status;
    private Date createdAt;
    private Date endAt;

//    @OneToMany(mappedBy = "requestOrder")
    private List<RequestOrderDetail> requestOrderDetails;

    public Integer getRequestOrderId() {
        return requestOrderId;
    }

    public void setRequestOrderId(Integer requestOrderId) {
        this.requestOrderId = requestOrderId;
    }

    public Request getRequest() {
        return request;
    }

    public void setRequest(Request request) {
        this.request = request;
    }

    public Design getDesign() {
        return design;
    }

    public void setDesign(Design design) {
        this.design = design;
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

    public List<RequestOrderDetail> getRequestOrderDetails() {
        return requestOrderDetails;
    }

    public void setRequestOrderDetails(List<RequestOrderDetail> requestOrderDetails) {
        this.requestOrderDetails = requestOrderDetails;
    }
// Getters and Setters
}
