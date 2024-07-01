package com.backendVn.SWP.dtos.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DesignResponse {
    Integer id;
    String designName;
    String description;
    List<String> listURLImage;
}
