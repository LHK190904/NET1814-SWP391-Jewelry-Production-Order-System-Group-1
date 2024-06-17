package com.backendVn.SWP.dtos.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WarrantyCardCreationRequest {
    @NotNull(message = "END_DATE_REQUIRED")
    @Future(message = "END_DATE_INVALID")
    Instant endAt;
}
