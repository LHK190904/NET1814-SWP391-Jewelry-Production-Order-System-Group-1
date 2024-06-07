package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.RequestCreationRequest;
import com.backendVn.SWP.dtos.request.RequestUpdateRequest;
import com.backendVn.SWP.dtos.response.RequestResponse;
import com.backendVn.SWP.entities.Request;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RequestMapper {
    Request toRequest(RequestCreationRequest requestCreationRequest);
    void updateRequestFromDto(@MappingTarget Request request, RequestUpdateRequest requestUpdateRequest);
    RequestResponse toRequestResponse(Request request);
}
