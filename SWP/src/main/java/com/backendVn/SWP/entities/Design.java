package com.backendVn.SWP.entities;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
public class Design {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DesignID", nullable = false)
    private Integer id;

    @Column(name = "DesignName", length = 100)
    private String designName;

    @Lob
    @Column(name = "Description")
    private String description;

    @Column(name = "URLImage")
    private String uRLImage;

    @OneToMany(mappedBy = "designID")
    private Set<RequestOrder> requestOrders = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDesignName() {
        return designName;
    }

    public void setDesignName(String designName) {
        this.designName = designName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getURLImage() {
        return uRLImage;
    }

    public void setURLImage(String uRLImage) {
        this.uRLImage = uRLImage;
    }

    public Set<RequestOrder> getRequestOrders() {
        return requestOrders;
    }

    public void setRequestOrders(Set<RequestOrder> requestOrders) {
        this.requestOrders = requestOrders;
    }

}