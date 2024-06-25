package com.backendVn.SWP.dtos.response;

import com.backendVn.SWP.entities.RequestOrderDetailId;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RequestOrderDetailResponse {
    RequestOrderDetailId id;
    Integer materialID;
    Integer requestOrderID;
    BigDecimal weight;
}
