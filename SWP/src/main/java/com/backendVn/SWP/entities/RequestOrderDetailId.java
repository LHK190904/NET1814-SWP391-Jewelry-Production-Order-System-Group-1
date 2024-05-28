package com.backendVn.SWP.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class RequestOrderDetailId implements Serializable {
    private static final long serialVersionUID = 110393245924314348L;
    @Column(name = "MaterialID", nullable = false)
    private Integer materialID;

    @Column(name = "RequestOrderID", nullable = false)
    private Integer requestOrderID;

    public Integer getMaterialID() {
        return materialID;
    }

    public void setMaterialID(Integer materialID) {
        this.materialID = materialID;
    }

    public Integer getRequestOrderID() {
        return requestOrderID;
    }

    public void setRequestOrderID(Integer requestOrderID) {
        this.requestOrderID = requestOrderID;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        RequestOrderDetailId entity = (RequestOrderDetailId) o;
        return Objects.equals(this.requestOrderID, entity.requestOrderID) &&
                Objects.equals(this.materialID, entity.materialID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(requestOrderID, materialID);
    }

}