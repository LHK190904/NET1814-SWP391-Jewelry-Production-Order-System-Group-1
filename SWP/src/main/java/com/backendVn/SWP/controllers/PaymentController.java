package com.backendVn.SWP.controllers;

import com.backendVn.SWP.dtos.response.ApiResponse;
import com.backendVn.SWP.dtos.response.PaymentResponse;
import com.backendVn.SWP.services.PaymentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentController {

    PaymentService paymentService;

    @PostMapping("/{requestId}")
    public ApiResponse<PaymentResponse> createPayment(@PathVariable Integer requestId) {
        return ApiResponse.<PaymentResponse>builder()
                .result(paymentService.createDeposit(requestId))
                .build();
    }
}
