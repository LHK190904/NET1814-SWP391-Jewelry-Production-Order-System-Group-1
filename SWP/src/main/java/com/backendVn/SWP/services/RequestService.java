package com.backendVn.SWP.services;

import com.backendVn.SWP.dtos.request.RequestCreationRequest;
import com.backendVn.SWP.dtos.request.RequestSalesUpdateRequest;
import com.backendVn.SWP.dtos.request.RequestUpdateRequest;
import com.backendVn.SWP.dtos.response.RequestResponse;
import com.backendVn.SWP.entities.Request;
import com.backendVn.SWP.entities.User;
import com.backendVn.SWP.exception.AppException;
import com.backendVn.SWP.exception.ErrorCode;
import com.backendVn.SWP.mappers.RequestMapper;
import com.backendVn.SWP.mappers.UserMapper;
import com.backendVn.SWP.repositories.RequestRepository;
import com.backendVn.SWP.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class RequestService {
    RequestRepository requestRepository;
    UserRepository userRepository;
    RequestMapper requestMapper;

    public RequestResponse createRequest(RequestCreationRequest requestCreationRequest, Integer userId) {
        User customer = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Request request = requestMapper.toRequest(requestCreationRequest);
        request.setCustomerID(customer);
        request.setStatus("Unapproved");
        request.setCreatedAt(Instant.now());

        Request savedRequest = requestRepository.save(request);

        return requestMapper.toRequestResponse(savedRequest);
    }

    public RequestResponse updateRequestByCustomer(Integer id, RequestUpdateRequest requestUpdateRequest) {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_NOT_FOUND));

        requestMapper.updateRequestFromDto(request, requestUpdateRequest);

        return requestMapper.toRequestResponse(requestRepository.save(request));
    }

    public RequestResponse updateRequestBySales(Integer id) {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_NOT_FOUND));

        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();

        User saleStaff = userRepository.findByUserName(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        request.setSaleStaffID(saleStaff);
        request.setRecievedAt(Instant.now());
        request.setStatus("Processing");

        Request updatedRequest = requestRepository.save(request);

        return requestMapper.toRequestResponse(updatedRequest);
    }


    public void deleteRequest(Integer id) {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_NOT_FOUND));
        requestRepository.delete(request);
    }

    public List<RequestResponse> getAllRequests() {
        return requestRepository.findAll().stream()
                .map(requestMapper::toRequestResponse)
                .toList();
    }

    public RequestResponse getRequestById(Integer id) {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_NOT_FOUND));
        return requestMapper.toRequestResponse(request);
    }

    public List<RequestResponse> getRequestsByCustomerId(Integer customerId) {
        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        List<Request> requests = requestRepository.findAllByCustomerID(customer);
        return requests.stream()
                .map(requestMapper::toRequestResponse)
                .toList();
    }

    public List<RequestResponse> getUnrecievedRequests() {
        return requestRepository.findAllBySaleStaffIDNull().stream()
                .map(requestMapper::toRequestResponse)
                .toList();
    }

    public List<RequestResponse> getRequestBySaleStaffId(Integer saleStaffId){
        User user = userRepository.findById(saleStaffId).get();

        return requestRepository.findAllBySaleStaffID(user).stream()
                .map(requestMapper::toRequestResponse)
                .toList();
    }

}
