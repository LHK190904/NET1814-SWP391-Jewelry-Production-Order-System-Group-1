package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.RequestCreationRequestForCustomerDesign;
import com.backendVn.SWP.dtos.response.RequestResponse;
import com.backendVn.SWP.entities.Request;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RequestMapper {

    Request toRequest(RequestCreationRequestForCustomerDesign requestCreationRequestForCustomerDesign);
    void updateRequestFromDto(@MappingTarget Request request, RequestCreationRequestForCustomerDesign requestCreationRequestForCustomerDesign);

    @Mapping(target = "customerID", source = "customerID.id")
    @Mapping(target = "saleStaffID", source = "saleStaffid.id")
    RequestResponse toRequestResponse(Request request);

}
