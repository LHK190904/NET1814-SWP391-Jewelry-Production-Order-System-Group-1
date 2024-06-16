package com.backendVn.SWP.dtos.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InvoiceDetailResponse {
    Integer id;
    Integer invoiceID;
    Integer materialID;
    Integer totalAmount;
    BigDecimal totalCost;
}
