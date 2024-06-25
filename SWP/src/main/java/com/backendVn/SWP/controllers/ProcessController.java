package com.backendVn.SWP.controllers;

import com.backendVn.SWP.dtos.response.ApiResponse;
import com.backendVn.SWP.dtos.response.ProcessResponse;
import com.backendVn.SWP.services.ProcessService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/process")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProcessController {
    ProcessService processService;

    @GetMapping
    public ApiResponse<List<ProcessResponse>> getAllProcess(){
        return ApiResponse.<List<ProcessResponse>>builder()
                .result(processService.getAllProcesses())
                .build();
    }

    @PostMapping("/{requestId}/{productionStaffId}")
    public ApiResponse<ProcessResponse> createProcess(@PathVariable Integer requestId, @PathVariable Integer productionStaffId){
        return ApiResponse.<ProcessResponse>builder()
                .result(processService.createProcess(requestId, productionStaffId))
                .build();
    }
}
