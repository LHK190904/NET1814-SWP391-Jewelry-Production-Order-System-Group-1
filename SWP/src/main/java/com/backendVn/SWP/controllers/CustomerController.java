package com.backendVn.SWP.controllers;

import com.backendVn.SWP.dtos.request.CustomerRegisterRequest;
import com.backendVn.SWP.dtos.request.UserCreationRequest;
import com.backendVn.SWP.dtos.response.ApiResponse;
import com.backendVn.SWP.dtos.request.AuthenticationRequest;
import com.backendVn.SWP.dtos.response.AuthenticationResponse;
import com.backendVn.SWP.services.AuthenticationService;
import com.backendVn.SWP.services.CustomerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cust")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerController {

    CustomerService customerService;

    @PostMapping("/register_token")
    ApiResponse<AuthenticationResponse> register(@RequestBody CustomerRegisterRequest request){
        var result = customerService.register(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }


}
