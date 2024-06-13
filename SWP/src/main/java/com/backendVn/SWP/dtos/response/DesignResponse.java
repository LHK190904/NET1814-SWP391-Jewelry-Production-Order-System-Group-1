package com.backendVn.SWP.dtos.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DesignResponse {
    Integer id;
    String designName;
    String description;
    String uRLImage;
}
