package com.backendVn.SWP.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "warranty_card")
public class WarrantyCard {
    @Id
    @Column(name = "request_orderid", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "request_orderid", nullable = false)
    private RequestOrder requestOrder;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "end_at")
    private Instant endAt;

}