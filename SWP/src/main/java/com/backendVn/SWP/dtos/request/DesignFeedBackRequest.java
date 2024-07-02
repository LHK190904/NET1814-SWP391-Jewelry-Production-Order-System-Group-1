package com.backendVn.SWP.dtos.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DesignFeedBackRequest {
    @NotNull(message = "WEiGHT_REQUIRED")
    String description;
}
