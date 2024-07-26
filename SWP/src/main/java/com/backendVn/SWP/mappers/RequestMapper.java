package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.RequestCreationRequestForCustomerDesign;
import com.backendVn.SWP.dtos.response.RequestResponse;
import com.backendVn.SWP.entities.Request;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RequestMapper {

    @Mapping(target = "createdAt", expression = "java(java.time.Instant.now())")
    @Mapping(target = "status", constant = "Unapproved")
    Request toRequest(RequestCreationRequestForCustomerDesign requestCreationRequestForCustomerDesign);

    void updateRequestFromDto(@MappingTarget Request request, RequestCreationRequestForCustomerDesign requestCreationRequestForCustomerDesign);

    @Mapping(target = "customerID", source = "customerID.id")
    @Mapping(target = "saleStaffID", source = "saleStaffid.id")
    @Mapping(target = "mainStone", source = "mainStone.id")
    @Mapping(target = "subStone", source = "subStone.id")
    @Mapping(target = "materialID", source = "materialID.id")
    @Mapping(target = "companyDesign", source = "companyDesign.id")
    RequestResponse toRequestResponse(Request request);

    @Mapping(target = "customerID", source = "request.customerID.id")
    @Mapping(target = "saleStaffID", source = "request.saleStaffid.id")
    @Mapping(target = "mainStone", source = "request.mainStone.id")
    @Mapping(target = "subStone", source = "request.subStone.id")
    @Mapping(target = "materialID", source = "request.materialID.id")
    @Mapping(target = "companyDesign", source = "request.companyDesign.id")
    RequestResponse toRequestResponseWithCustomerDesign(Request request, List<String> listURLImage);

}
