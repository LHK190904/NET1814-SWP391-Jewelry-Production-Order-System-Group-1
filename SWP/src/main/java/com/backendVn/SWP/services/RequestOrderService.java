package com.backendVn.SWP.services;

import com.backendVn.SWP.dtos.response.RequestOrderResponse;
import com.backendVn.SWP.entities.Design;
import com.backendVn.SWP.entities.Request;
import com.backendVn.SWP.entities.RequestOrder;
import com.backendVn.SWP.exception.AppException;
import com.backendVn.SWP.exception.ErrorCode;
import com.backendVn.SWP.mappers.RequestOrderMapper;
import com.backendVn.SWP.repositories.DesignRepository;
import com.backendVn.SWP.repositories.RequestOrderRepository;
import com.backendVn.SWP.repositories.RequestRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RequestOrderService {
    RequestOrderRepository requestOrderRepository;
    RequestRepository requestRepository;
    RequestOrderMapper requestOrderMapper;
    private final DesignRepository designRepository;

    public RequestOrderResponse createRequestOrder(Integer id) {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_NOT_FOUND));

        RequestOrder requestOrder = RequestOrder.builder()
                .requestID(request)
                .status("New")
                .createdAt(Instant.now())
                .build();

        RequestOrder savedRequestOrder = requestOrderRepository.save(requestOrder);

        return requestOrderMapper.toRequestOrderResponse(savedRequestOrder);
    }

    public void deleteRequestOrder(Integer id) {
        RequestOrder requestOrder = requestOrderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_ORDER_NOT_FOUND));
        requestOrderRepository.delete(requestOrder);
    }

    public List<RequestOrderResponse> getAllRequestOrders() {
        return requestOrderRepository.findAll().stream()
                .map(requestOrderMapper::toRequestOrderResponse)
                .toList();
    }

    public RequestOrderResponse getRequestOrderById(Integer id) {
        RequestOrder requestOrder = requestOrderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_ORDER_NOT_FOUND));
        return requestOrderMapper.toRequestOrderResponse(requestOrder);
    }

    public RequestOrderResponse updateRequestOrderWithDesign(Integer requestOrderId, Integer designId) {
        RequestOrder requestOrder = requestOrderRepository.findById(requestOrderId)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_ORDER_NOT_FOUND));

        Design design = designRepository.findById(designId)
                .orElseThrow(() -> new AppException(ErrorCode.DESIGN_NOT_FOUND));

        requestOrder.setDesignID(design);
        RequestOrder savedRequestOrder =requestOrderRepository.save(requestOrder);
        return requestOrderMapper.toRequestOrderResponse(savedRequestOrder);
    }

}
