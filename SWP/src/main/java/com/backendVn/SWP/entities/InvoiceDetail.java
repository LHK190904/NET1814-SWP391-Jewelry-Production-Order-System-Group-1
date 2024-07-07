package com.backendVn.SWP.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InvoiceDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InvoiceDetailID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "InvoiceID")
    private Invoice invoiceID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaterialID")
    private Material materialID;

    @Column(name = "TotalAmount")
    private BigDecimal totalAmount;

    @Column(name = "TotalCost", precision = 18, scale = 2)
    private BigDecimal totalCost;

}