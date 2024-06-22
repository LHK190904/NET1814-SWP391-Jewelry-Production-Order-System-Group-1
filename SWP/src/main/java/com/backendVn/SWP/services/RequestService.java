package com.backendVn.SWP.services;

import com.backendVn.SWP.dtos.request.RequestCreationRequest;
import com.backendVn.SWP.dtos.response.RequestResponse;
import com.backendVn.SWP.dtos.response.UserResponse;
import com.backendVn.SWP.entities.Request;
import com.backendVn.SWP.entities.User;
import com.backendVn.SWP.exception.AppException;
import com.backendVn.SWP.exception.ErrorCode;
import com.backendVn.SWP.mappers.RequestMapper;
import com.backendVn.SWP.mappers.UserMapper;
import com.backendVn.SWP.repositories.QuotationRepository;
import com.backendVn.SWP.repositories.RequestRepository;
import com.backendVn.SWP.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class RequestService {
    private static final Logger log = LoggerFactory.getLogger(RequestService.class);
    RequestRepository requestRepository;
    UserRepository userRepository;
    RequestMapper requestMapper;
    UserMapper userMapper;
    private final QuotationRepository quotationRepository;

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

    public RequestResponse updateRequestByCustomer(Integer id, RequestCreationRequest requestCreationRequest) {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_NOT_FOUND));

        if ("Pending Quotation".equalsIgnoreCase(request.getStatus())) {
            throw new AppException(ErrorCode.REQUEST_STATUS_NOT_ALLOWED);
        }

        requestMapper.updateRequestFromDto(request, requestCreationRequest);

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

        return requestMapper.toRequestResponse(requestRepository.save(request));
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

    public UserResponse getUserById(Integer id) {
        return userMapper.toUserResponse(userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found")));
    }

    public RequestResponse  approveQuotationFromCustomer(Integer requestId) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_NOT_FOUND));

        request.setStatus("Ordering");

        Request savedRequest = requestRepository.save(request);

        return requestMapper.toRequestResponse(savedRequest);
    }

    public RequestResponse denyQuotationFromCustomer(Integer requestId) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_NOT_FOUND));

        request.setStatus("Unapproved");

        Request savedRequest = requestRepository.save(request);

        return requestMapper.toRequestResponse(savedRequest);
    }

    public List<RequestResponse> getListOfRequestQuotations() {
        List<Request> requests = requestRepository.findByStatus("Pending quotation");
        return requests.stream().map(requestMapper::toRequestResponse).toList();
    }
}
