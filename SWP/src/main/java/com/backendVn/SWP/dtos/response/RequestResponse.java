package com.backendVn.SWP.dtos.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RequestResponse {
    Integer requestId;
    Integer customerId;
    String description;
    String status;
    Instant createdAt;
    Instant recievedAt;
    Instant endAt;
}
