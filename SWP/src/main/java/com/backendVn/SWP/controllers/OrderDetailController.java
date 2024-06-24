package com.backendVn.SWP.controllers;

import com.backendVn.SWP.dtos.request.RequestOrderDetailRequest;
import com.backendVn.SWP.dtos.request.UserCreationRequest;
import com.backendVn.SWP.dtos.response.ApiResponse;
import com.backendVn.SWP.dtos.response.RequestOrderDetailResponse;
import com.backendVn.SWP.entities.RequestOrderDetailId;
import com.backendVn.SWP.services.RequestOrderDetailService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/request-orders-detail")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderDetailController {
    RequestOrderDetailService requestOrderDetailService;

    @GetMapping
    public ApiResponse<List<RequestOrderDetailResponse>> getAllRequestOrderDetail() {
        return ApiResponse.<List<RequestOrderDetailResponse>>builder()
                .result(requestOrderDetailService.getAllRequestOrderDetails())
                .build();
    }

    @PostMapping("/{requestOrderId}/{materialId}")
    public ApiResponse<RequestOrderDetailResponse> addRequestOrderDetail(@RequestBody @Valid RequestOrderDetailRequest request, @PathVariable Integer requestOrderId, @PathVariable Integer materialId) {
        return ApiResponse.<RequestOrderDetailResponse>builder()
                .result(requestOrderDetailService.createRequestOrderDetail(request, requestOrderId, materialId))
                .build();
    }

    @PutMapping("/{requestOrderDetailId}/{newMaterialId}")
    public ApiResponse<RequestOrderDetailResponse> updateOrderDetail(@RequestBody @Valid RequestOrderDetailRequest request, @PathVariable RequestOrderDetailId requestOrderDetailId, @PathVariable Integer newMaterialId) {
        return ApiResponse.<RequestOrderDetailResponse>builder()
                .result(requestOrderDetailService.updateRequestOrderDetail(request, requestOrderDetailId, newMaterialId))
                .build();
    }
}

