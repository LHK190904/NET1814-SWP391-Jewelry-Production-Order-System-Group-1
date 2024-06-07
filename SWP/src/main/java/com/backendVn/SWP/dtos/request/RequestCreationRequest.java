package com.backendVn.SWP.dtos.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RequestCreationRequest {
    @NotEmpty(message = "DESCRIPTION_EMPTY")
    String description;
}
