package com.backendVn.SWP.dtos.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MaterialRequest {
    String type;
    BigDecimal pricePerUnit;
    String materialName;
}
