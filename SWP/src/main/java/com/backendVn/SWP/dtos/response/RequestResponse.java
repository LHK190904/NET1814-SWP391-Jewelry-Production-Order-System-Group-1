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
public class RequestResponse {
    Integer id;
    String description;
    Integer customerID;
    Integer saleStaffID;
    String status;
    Instant createdAt;
    Instant recievedAt;
    Instant endAt;
    BigDecimal cost;
}
