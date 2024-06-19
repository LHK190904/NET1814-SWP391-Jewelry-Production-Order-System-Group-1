package com.backendVn.SWP.controllers;


import com.backendVn.SWP.dtos.request.DesignCreationRequest;
import com.backendVn.SWP.dtos.request.DesignUpdateRequest;
import com.backendVn.SWP.dtos.response.ApiResponse;
import com.backendVn.SWP.dtos.response.DesignResponse;
import com.backendVn.SWP.services.DesignService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/design")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DesignController {
    DesignService designService;

    @PostMapping
    public ApiResponse<DesignResponse> createDesign(@RequestBody @Valid DesignCreationRequest designCreationRequest) {
        DesignResponse designResponse = designService.createDesign(designCreationRequest);
        return ApiResponse.<DesignResponse>builder()
                .result(designResponse)
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<DesignResponse> updateDesign(@PathVariable Integer id, @RequestBody @Valid DesignUpdateRequest designUpdateRequest) {
        DesignResponse designResponse = designService.updateDesign(id, designUpdateRequest);
        return ApiResponse.<DesignResponse>builder()
                .result(designResponse)
                .build();
    }


    @GetMapping
    public ApiResponse<List<DesignResponse>> getAllDesigns() {
        List<DesignResponse> designResponse = designService.getAllDesign();
        return ApiResponse.<List<DesignResponse>>builder()
                .result(designResponse)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<DesignResponse> getDesignById(@PathVariable Integer id) {
        DesignResponse designResponse = designService.getDesignById(id);
        return ApiResponse.<DesignResponse>builder()
                .result(designResponse)
                .build();
    }

}
