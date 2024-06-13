package com.backendVn.SWP.services;

import com.backendVn.SWP.dtos.request.DesignCreationRequest;
import com.backendVn.SWP.dtos.request.DesignUpdateRequest;
import com.backendVn.SWP.dtos.response.DesignResponse;
import com.backendVn.SWP.dtos.response.QuotationResponse;
import com.backendVn.SWP.dtos.response.UserResponse;
import com.backendVn.SWP.entities.Design;
import com.backendVn.SWP.entities.Quotation;
import com.backendVn.SWP.entities.User;
import com.backendVn.SWP.exception.AppException;
import com.backendVn.SWP.exception.ErrorCode;
import com.backendVn.SWP.mappers.DesignMapper;
import com.backendVn.SWP.repositories.DesignRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class DesignService {
    DesignRepository designRepository;
    DesignMapper designMapper;

    public DesignResponse createDesign(DesignCreationRequest designCreationRequest){
        Design design = designMapper.toDesign(designCreationRequest);

        Design savedDesign = designRepository.save(design);

        return designMapper.toDesignResponse(savedDesign);
    }

    public List<DesignResponse> getAllDesign() {
        return designRepository.findAll().stream()
                .map(designMapper::toDesignResponse).toList();
    }

    public void deleteDesign(Integer id) {
        designRepository.deleteById(id);
    }

    public DesignResponse updateDesign(Integer id, DesignUpdateRequest designUpdateRequest) {
        Design design = designRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.DESIGN_NOT_FOUND));
        designMapper.updateDesign(design, designUpdateRequest);
        return designMapper.toDesignResponse(design);
    }

    public DesignResponse getDesignById(Integer id) {
        return designMapper.toDesignResponse(designRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.DESIGN_NOT_FOUND)));
    }
}
