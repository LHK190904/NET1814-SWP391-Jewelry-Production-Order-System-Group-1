package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.QuotationCreationRequest;
import com.backendVn.SWP.dtos.response.QuotationResponse;
import com.backendVn.SWP.entities.Quotation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface QuotationMapper {

    Quotation toQuotation(QuotationCreationRequest quotationCreationRequest);

    @Mapping(target = "requestID", source = "requestID.id")
    QuotationResponse toQuotationResponse(Quotation quotation);
}
