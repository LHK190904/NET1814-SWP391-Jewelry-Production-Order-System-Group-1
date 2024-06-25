package com.backendVn.SWP.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
public class Design {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DesignID", nullable = false)
    private Integer id;

    @Size(max = 100)
    @Nationalized
    @Column(name = "design_name", length = 100)
    private String designName;

    @Nationalized
    @Lob
    @Column(name = "Description")
    private String description;

    @Nationalized
    @Lob
    @Column(name = "URLImage")
    private String uRLImage;

    @OneToMany(mappedBy = "designID")
    private Set<RequestOrder> requestOrders = new LinkedHashSet<>();

}