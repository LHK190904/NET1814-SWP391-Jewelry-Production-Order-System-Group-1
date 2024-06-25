package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.QuotationCreationRequest;
import com.backendVn.SWP.dtos.response.QuotationResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface QuotationMapper {

    Quotation toQuotation(QuotationCreationRequest quotationCreationRequest);

    @Mapping(target = "requestID", source = "requestID.id")
    @Mapping(target = "approvedBy", source = "approveBy.id")
    QuotationResponse toQuotationResponse(Quotation quotation);
}
