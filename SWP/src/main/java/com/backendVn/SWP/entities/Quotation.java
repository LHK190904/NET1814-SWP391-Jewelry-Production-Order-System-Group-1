package com.backendVn.SWP.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Quotation {
    @Id
    @Column(name = "QuotationID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RequestID")
    private Request requestID;

    @ColumnDefault("getdate()")
    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "approved_at")
    private Instant approvedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approve_by")
    private User approveBy;

    @Column(name = "Cost", precision = 18, scale = 2)
    private BigDecimal cost;

    @Column(name = "capital_cost", precision = 18, scale = 2)
    private BigDecimal capitalCost;

}