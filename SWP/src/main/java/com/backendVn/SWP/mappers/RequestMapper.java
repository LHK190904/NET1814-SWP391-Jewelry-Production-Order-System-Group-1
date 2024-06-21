package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.RequestCreationRequest;
import com.backendVn.SWP.dtos.response.RequestResponse;
import com.backendVn.SWP.entities.Quotation;
import com.backendVn.SWP.entities.Request;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RequestMapper {

    Request toRequest(RequestCreationRequest requestCreationRequest);
    void updateRequestFromDto(@MappingTarget Request request, RequestCreationRequest requestCreationRequest);

    @Mapping(target = "customerID", source = "customerID.id")
    @Mapping(target = "saleStaffID", source = "saleStaffID.id")
    RequestResponse toRequestResponse(Request request);

}