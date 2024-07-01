package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.QuotationCreationRequest;
import com.backendVn.SWP.dtos.response.AutoPricingResponse;
import com.backendVn.SWP.dtos.response.QuotationResponse;
import com.backendVn.SWP.entities.Quotation;
import com.backendVn.SWP.entities.Request;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface QuotationMapper {

    Quotation toQuotation(QuotationCreationRequest quotationCreationRequest);

    @Mapping(target = "requestID", source = "requestID.id")
    @Mapping(target = "approvedBy", source = "approveBy.id")
    QuotationResponse toQuotationResponse(Quotation quotation);

    @Mapping(target = "material", source = "materialID")
    @Mapping(target = "materialWeight", source = "materialWeight")
    @Mapping(target = "producePrice", source = "produceCost")
    AutoPricingResponse toAutoPricingResponse(Request request);

}
