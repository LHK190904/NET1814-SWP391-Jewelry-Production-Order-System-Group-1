package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.WarrantyCardCreationRequest;
import com.backendVn.SWP.dtos.response.WarrantyCardResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface WarrantyCardMapper {
    WarrantyCard toWarrantyCard(WarrantyCardCreationRequest warrantyCardCreationRequest);
    void updateWarranty(@MappingTarget WarrantyCard warrantyCard, WarrantyCardCreationRequest warrantyCardCreationRequest);
    WarrantyCardResponse toWarrantyCardResponse(WarrantyCard warrantyCard);
}
