package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.RequestOrderDetailRequest;
import com.backendVn.SWP.dtos.response.RequestOrderDetailResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RequestOrderDetailMapper {
    @Mapping(target = "materialID", source = "materialID.id")
    @Mapping(target = "requestOrderID", source = "requestOrderid.id")
    RequestOrderDetailResponse toRequestOrderDetailResponse(RequestOrderDetail requestOrderDetail);
    RequestOrderDetail toRequestOrderDetail(RequestOrderDetailRequest requestOrderDetailRequest);
    void updateRequestOrderDetail(@MappingTarget RequestOrderDetail requestOrderDetail, RequestOrderDetailRequest requestOrderDetailRequest);
}
