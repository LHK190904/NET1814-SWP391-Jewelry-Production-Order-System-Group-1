package com.backendVn.SWP.controllers;


import com.backendVn.SWP.dtos.request.RequestCreationRequest;
import com.backendVn.SWP.dtos.response.ApiResponse;
import com.backendVn.SWP.dtos.response.RequestResponse;
import com.backendVn.SWP.services.RequestService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RequestController {
    RequestService requestService;

    @PostMapping("/{userId}")
    public ApiResponse<RequestResponse> createRequest(@PathVariable Integer userId, @RequestBody @Valid RequestCreationRequest requestCreationRequest) {
        RequestResponse requestResponse = requestService.createRequest(requestCreationRequest, userId);
        return ApiResponse.<RequestResponse>builder()
                .result(requestResponse)
                .build();
    }

    @PutMapping("/{requestId}")
    public ApiResponse<RequestResponse> updateRequestByCustomer(@PathVariable Integer requestId, @RequestBody @Valid RequestCreationRequest requestCreationRequest) {
        RequestResponse requestResponse = requestService.updateRequestByCustomer(requestId, requestCreationRequest);
        return ApiResponse.<RequestResponse>builder()
                .result(requestResponse)
                .build();
    }

    @PutMapping("/sales/{requestId}")
    public ApiResponse<RequestResponse> updateRequestBySales(@PathVariable Integer requestId) {
        return ApiResponse.<RequestResponse>builder()
                .result(requestService.updateRequestBySales(requestId))
                .build();
    }

    @GetMapping
    public ApiResponse<List<RequestResponse>> getAllRequests() {
        List<RequestResponse> requestResponses = requestService.getAllRequests();
        return ApiResponse.<List<RequestResponse>>builder()
                .result(requestResponses)
                .build();
    }

    @GetMapping("/{requestId}")
    public ApiResponse<RequestResponse> getRequestById(@PathVariable Integer requestId) {
        RequestResponse requestResponse = requestService.getRequestById(requestId);
        return ApiResponse.<RequestResponse>builder()
                .result(requestResponse)
                .build();
    }

    @GetMapping("/customer/{customerId}")
    public ApiResponse<List<RequestResponse>> getRequestsByCustomerId(@PathVariable Integer customerId) {
        List<RequestResponse> requestResponses = requestService.getRequestsByCustomerId(customerId);
        return ApiResponse.<List<RequestResponse>>builder()
                .result(requestResponses)
                .build();
    }

    @DeleteMapping("/{id}")
    public void deleteRequest(@PathVariable Integer id) {
        requestService.deleteRequest(id);
    }

    @GetMapping("/unrecievedRequest")
    public ApiResponse<List<RequestResponse>> getUnrecievedRequests() {
        return ApiResponse.<List<RequestResponse>>builder()
                .result(requestService.getUnrecievedRequests())
                .build();
    }

    @GetMapping("/sales/{saleStaffId}")
    public ApiResponse<List<RequestResponse>> getRequestsBySaleStaffId(@PathVariable Integer saleStaffId) {
        return ApiResponse.<List<RequestResponse>>builder()
                .result(requestService.getRequestBySaleStaffId(saleStaffId))
                .build();
    }
}
