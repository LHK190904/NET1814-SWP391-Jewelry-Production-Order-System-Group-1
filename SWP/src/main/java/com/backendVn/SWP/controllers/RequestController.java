package com.backendVn.SWP.controllers;


import com.backendVn.SWP.dtos.request.RequestCreationRequest;
import com.backendVn.SWP.dtos.request.RequestSalesUpdateRequest;
import com.backendVn.SWP.dtos.request.RequestUpdateRequest;
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

    @PostMapping("/{Id}")
    public ApiResponse<RequestResponse> createRequest(@PathVariable Integer Id, @RequestBody @Valid RequestCreationRequest requestCreationRequest) {
        RequestResponse requestResponse = requestService.createRequest(requestCreationRequest, Id);
        return ApiResponse.<RequestResponse>builder()
                .result(requestResponse)
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<RequestResponse> updateRequest(@PathVariable Integer id, @RequestBody @Valid RequestUpdateRequest requestUpdateRequest) {
        RequestResponse requestResponse = requestService.updateRequest(id, requestUpdateRequest);
        return ApiResponse.<RequestResponse>builder()
                .result(requestResponse)
                .build();
    }

    @PutMapping("/sales/{id}")
    public ApiResponse<RequestResponse> updateRequestBySales(@PathVariable Integer id) {
        return ApiResponse.<RequestResponse>builder()
                .result(requestService.updateRequestBySales(id))
                .build();
    }

    @GetMapping
    public ApiResponse<List<RequestResponse>> getAllRequests() {
        List<RequestResponse> requestResponses = requestService.getAllRequests();
        return ApiResponse.<List<RequestResponse>>builder()
                .result(requestResponses)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<RequestResponse> getRequestById(@PathVariable Integer id) {
        RequestResponse requestResponse = requestService.getRequestById(id);
        return ApiResponse.<RequestResponse>builder()
                .result(requestResponse)
                .build();
    }

}
