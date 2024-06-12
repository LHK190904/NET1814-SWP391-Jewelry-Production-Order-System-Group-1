package com.backendVn.SWP.controllers;

import com.backendVn.SWP.dtos.request.RequestOrderCreationRequest;
import com.backendVn.SWP.dtos.response.ApiResponse;
import com.backendVn.SWP.dtos.response.RequestOrderResponse;
import com.backendVn.SWP.services.RequestOrderService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/request-orders")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RequestOrderController {
    RequestOrderService requestOrderService;

    @PostMapping("/create")
    public ApiResponse<RequestOrderResponse> createRequestOrder(@RequestBody @Valid RequestOrderCreationRequest requestOrderCreationRequest) {
        RequestOrderResponse requestOrderResponse = requestOrderService.createRequestOrder(requestOrderCreationRequest);
        return ApiResponse.<RequestOrderResponse>builder()
                .result(requestOrderResponse)
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteRequestOrder(@PathVariable Integer id) {
        requestOrderService.deleteRequestOrder(id);
        return ApiResponse.<Void>builder().build();
    }

    @GetMapping
    public ApiResponse<List<RequestOrderResponse>> getAllRequestOrders() {
        List<RequestOrderResponse> requestOrderResponses = requestOrderService.getAllRequestOrders();
        return ApiResponse.<List<RequestOrderResponse>>builder()
                .result(requestOrderResponses)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<RequestOrderResponse> getRequestOrderById(@PathVariable Integer id) {
        RequestOrderResponse requestOrderResponse = requestOrderService.getRequestOrderById(id);
        return ApiResponse.<RequestOrderResponse>builder()
                .result(requestOrderResponse)
                .build();
    }
}
