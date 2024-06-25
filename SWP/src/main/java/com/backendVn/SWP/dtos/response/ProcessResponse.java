package com.backendVn.SWP.dtos.response;

import com.backendVn.SWP.entities.Request;
import com.backendVn.SWP.entities.RequestOrder;
import com.backendVn.SWP.entities.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProcessResponse {
    Integer id;
    RequestOrder requestID;
    Instant updatedAt;
    User updatedBy;
    String status;
}
