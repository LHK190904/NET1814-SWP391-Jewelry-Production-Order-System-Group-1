package com.backendVn.SWP.controllers;

import com.backendVn.SWP.dtos.request.QuotationCreationRequest;
import com.backendVn.SWP.dtos.response.ApiResponse;
import com.backendVn.SWP.dtos.response.QuotationResponse;
import com.backendVn.SWP.services.QuotationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quotation")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class QuotationController {
    QuotationService quotationService;

    @PostMapping("/{Id}")
    public ApiResponse<QuotationResponse> createQuotation(@PathVariable Integer Id, @RequestBody QuotationCreationRequest quotationCreationRequest){
        QuotationResponse quotationResponse = quotationService.createQuotation(quotationCreationRequest, Id);
        return ApiResponse.<QuotationResponse>builder()
                .result(quotationResponse)
                .build();
    }

    @GetMapping
    public ApiResponse<List<QuotationResponse>> getQuotation(){
        return ApiResponse.<List<QuotationResponse>>builder()
                .result(quotationService.getAllQuotation())
                .build();
    }

    @PutMapping("/update/{Id}")
    public ApiResponse<QuotationResponse> updateQuotation(@PathVariable Integer Id){
        return ApiResponse.<QuotationResponse>builder()
                .result(quotationService.updateQuotation(Id))
                .build();
    }
}