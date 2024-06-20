package com.backendVn.SWP.services;

import com.backendVn.SWP.dtos.request.RequestOrderDetailRequest;
import com.backendVn.SWP.dtos.response.RequestOrderDetailResponse;
import com.backendVn.SWP.entities.Material;
import com.backendVn.SWP.entities.RequestOrder;
import com.backendVn.SWP.entities.RequestOrderDetail;
import com.backendVn.SWP.entities.RequestOrderDetailId;
import com.backendVn.SWP.exception.AppException;
import com.backendVn.SWP.exception.ErrorCode;
import com.backendVn.SWP.mappers.RequestOrderDetailMapper;
import com.backendVn.SWP.repositories.MaterialRepository;
import com.backendVn.SWP.repositories.RequestOrderDetailRepository;
import com.backendVn.SWP.repositories.RequestOrderRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RequestOrderDetailService {
    RequestOrderDetailRepository requestOrderDetailRepository;
    RequestOrderDetailMapper requestOrderDetailMapper;
    RequestOrderRepository requestOrderRepository;
    MaterialRepository materialRepository;


    public List<RequestOrderDetailResponse> getAllRequestOrderDetails() {
        return requestOrderDetailRepository.findAll().stream()
                .map(requestOrderDetailMapper::toRequestOrderDetailResponse).toList();
    }

    public RequestOrderDetailResponse createRequestOrderDetail(RequestOrderDetailRequest requestOrderDetailRequest, Integer requestOrderId, Integer materialId) {
        RequestOrder requestOrder = requestOrderRepository.findById(requestOrderId)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_ORDER_NOT_FOUND));

        Material material = materialRepository.findById(materialId)
                .orElseThrow(() -> new AppException(ErrorCode.MATERIAL_NOT_FOUND));

        RequestOrderDetail requestOrderDetail = requestOrderDetailMapper.toRequestOrderDetail(requestOrderDetailRequest);
        requestOrderDetail.setRequestOrderid(requestOrder);
        requestOrderDetail.setMaterialID(material);

        RequestOrderDetailId requestOrderDetailId = new RequestOrderDetailId();
        requestOrderDetailId.setRequestOrderid(requestOrderId);
        requestOrderDetailId.setMaterialID(materialId);

        requestOrderDetail.setId(requestOrderDetailId);

        RequestOrderDetail savedRequestOrderDetail = requestOrderDetailRepository.save(requestOrderDetail);

        return requestOrderDetailMapper.toRequestOrderDetailResponse(savedRequestOrderDetail);
    }

    public RequestOrderDetailResponse updateRequestOrderDetail(RequestOrderDetailRequest requestOrderDetailRequest, RequestOrderDetailId requestOrderDetailId, Integer newMaterialId) {
        RequestOrderDetail requestOrderDetail = requestOrderDetailRepository.findById(requestOrderDetailId)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_ORDER_DETAIL_NOT_FOUND));

        return null;
    }
}
