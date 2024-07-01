package com.backendVn.SWP.controllers;

import com.backendVn.SWP.dtos.request.CustomerRegisterRequest;
import com.backendVn.SWP.dtos.response.ApiResponse;
import com.backendVn.SWP.dtos.response.AuthenticationResponse;
import com.backendVn.SWP.dtos.response.UserResponse;
import com.backendVn.SWP.services.CustomerService;
import com.backendVn.SWP.services.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cust")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerController {

    CustomerService customerService;
    UserService userService;

    @PostMapping("/register_token")
    ApiResponse<AuthenticationResponse> register(@RequestBody @Valid CustomerRegisterRequest request){
        var result = customerService.register(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @GetMapping("/myInfo")
    ApiResponse<UserResponse> getMyInfo(){
        return ApiResponse.<UserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }


}
