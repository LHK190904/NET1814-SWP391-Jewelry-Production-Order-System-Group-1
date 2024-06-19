package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.RequestOrderDetailRequest;
import com.backendVn.SWP.dtos.response.RequestOrderDetailResponse;
import com.backendVn.SWP.entities.RequestOrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RequestOrderDetailMapper {
    @Mapping(target = "materialID", source = "materialID.id")
    @Mapping(target = "requestOrderID", source = "requestOrderid.id")
    RequestOrderDetailResponse toRequestOrderDetailResponse(RequestOrderDetail requestOrderDetail);
    RequestOrderDetail toRequestOrderDetail(RequestOrderDetailRequest requestOrderDetailRequest);
}
