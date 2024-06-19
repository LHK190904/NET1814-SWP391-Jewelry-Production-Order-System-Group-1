package com.backendVn.SWP.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;

import java.time.Instant;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "request_order")
public class RequestOrder {
    @Id
    @Column(name = "request_orderid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RequestID")
    private Request requestID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DesignID")
    private Design designID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "design_staff")
    private User designStaff;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "production_staff")
    private User productionStaff;

    @Size(max = 50)
    @Nationalized
    @Column(name = "Status", length = 50)
    private String status;

    @ColumnDefault("getdate()")
    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "end_at")
    private Instant endAt;

}