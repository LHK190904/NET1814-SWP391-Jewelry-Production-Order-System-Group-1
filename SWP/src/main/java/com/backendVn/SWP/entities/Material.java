package com.backendVn.SWP.entities;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaterialID", nullable = false)
    private Integer id;

    @Column(name = "Type", length = 50)
    private String type;

    @Column(name = "PricePerUnit", precision = 18, scale = 2)
    private BigDecimal pricePerUnit;

    @Column(name = "MaterialName", length = 100)
    private String materialName;

    @OneToMany(mappedBy = "materialID")
    private Set<InvoiceDetail> invoiceDetails = new LinkedHashSet<>();

    @OneToMany(mappedBy = "materialID")
    private Set<RequestOrderDetail> requestOrderDetails = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BigDecimal getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(BigDecimal pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public String getMaterialName() {
        return materialName;
    }

    public void setMaterialName(String materialName) {
        this.materialName = materialName;
    }

    public Set<InvoiceDetail> getInvoiceDetails() {
        return invoiceDetails;
    }

    public void setInvoiceDetails(Set<InvoiceDetail> invoiceDetails) {
        this.invoiceDetails = invoiceDetails;
    }

    public Set<RequestOrderDetail> getRequestOrderDetails() {
        return requestOrderDetails;
    }

    public void setRequestOrderDetails(Set<RequestOrderDetail> requestOrderDetails) {
        this.requestOrderDetails = requestOrderDetails;
    }

}