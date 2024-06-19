package com.backendVn.SWP.dtos.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RequestOrderDetailRequest {
    @NotNull(message = "WEiGHT_REQUIRED")
    @DecimalMin(value = "0.0", inclusive = false, message = "WEIGHT_INVALID")
    BigDecimal weight;
}
