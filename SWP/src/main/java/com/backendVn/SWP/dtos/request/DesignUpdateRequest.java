package com.backendVn.SWP.dtos.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DesignUpdateRequest {
    @NotEmpty(message = "DESIGN_NAME_EMPTY")
    @Size(max = 100, message = "DESIGN_NAME_TOO_LONG")
    String designName;

    @NotEmpty(message = "DESCRIPTION_EMPTY")
    String description;

    List<String> listURLImage;
}
