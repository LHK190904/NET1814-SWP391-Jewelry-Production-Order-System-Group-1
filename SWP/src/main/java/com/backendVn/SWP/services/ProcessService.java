package com.backendVn.SWP.services;

import com.backendVn.SWP.dtos.response.ProcessResponse;
import com.backendVn.SWP.entities.Process;
import com.backendVn.SWP.entities.Request;
import com.backendVn.SWP.entities.RequestOrder;
import com.backendVn.SWP.entities.User;
import com.backendVn.SWP.exception.AppException;
import com.backendVn.SWP.exception.ErrorCode;
import com.backendVn.SWP.mappers.ProcessMapper;
import com.backendVn.SWP.repositories.ProcessRepository;
import com.backendVn.SWP.repositories.RequestOrderRepository;
import com.backendVn.SWP.repositories.RequestRepository;
import com.backendVn.SWP.repositories.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProcessService {
    ProcessRepository processRepository;
    ProcessMapper processMapper;
    RequestOrderRepository requestOrderRepository;
    UserRepository userRepository;

    public List<ProcessResponse> getAllProcesses() {
        return processRepository.findAll().stream()
                .map(processMapper::toProcessResponse).toList();
    }

    public ProcessResponse createProcess(Integer requestOrderId, Integer userId) {
        Process process = new Process();

        RequestOrder requestOrder = requestOrderRepository.findById(requestOrderId)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_ORDER_NOT_FOUND));
        process.setRequestID(requestOrder);
        process.setUpdatedAt(Instant.now());

        User productionStaff = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        process.setUpdatedBy(productionStaff);

        process.setStatus("Prepare material for the product");

        Process savedProcess = processRepository.save(process);

        return processMapper.toProcessResponse(savedProcess);
    }
}
