package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.response.ProcessResponse;
import com.backendVn.SWP.entities.Process;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProcessMapper {
    ProcessResponse toProcessResponse(Process process);
}
