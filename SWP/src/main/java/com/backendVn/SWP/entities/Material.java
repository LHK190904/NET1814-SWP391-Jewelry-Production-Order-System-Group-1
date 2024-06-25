package com.backendVn.SWP.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaterialID", nullable = false)
    private Integer id;

    @Size(max = 50)
    @Nationalized
    @Column(name = "Type", length = 50)
    private String type;

    @Column(name = "price_per_unit", precision = 18, scale = 2)
    private BigDecimal pricePerUnit;

    @Size(max = 100)
    @Nationalized
    @Column(name = "material_name", length = 100)
    private String materialName;

    @OneToMany(mappedBy = "materialID")
    private Set<InvoiceDetail> invoiceDetails = new LinkedHashSet<>();

    @OneToMany(mappedBy = "materialID")
    private Set<RequestOrderDetail> requestOrderDetails = new LinkedHashSet<>();

}