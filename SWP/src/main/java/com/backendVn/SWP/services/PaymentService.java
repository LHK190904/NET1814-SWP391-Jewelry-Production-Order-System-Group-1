package com.backendVn.SWP.services;

import com.backendVn.SWP.dtos.response.PaymentResponse;
import com.backendVn.SWP.entities.Payment;
import com.backendVn.SWP.entities.Quotation;
import com.backendVn.SWP.entities.Request;
import com.backendVn.SWP.entities.RequestOrder;
import com.backendVn.SWP.exception.AppException;
import com.backendVn.SWP.exception.ErrorCode;
import com.backendVn.SWP.mappers.PaymentMapper;
import com.backendVn.SWP.repositories.PaymentRepository;
import com.backendVn.SWP.repositories.QuotationRepository;
import com.backendVn.SWP.repositories.RequestOrderRepository;
import com.backendVn.SWP.repositories.RequestRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentService {

    RequestRepository requestRepository;
    QuotationRepository quotationRepository;
    PaymentRepository paymentRepository;
    RequestOrderRepository requestOrderRepository;
    PaymentMapper paymentMapper;

    public PaymentResponse create(Integer requestId){
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_NOT_FOUND));
        List<Quotation> quotations = quotationRepository.findByRequestID(request)
                .orElseThrow(() -> new AppException(ErrorCode.QUOTATION_NOT_FOUND));
        quotations.sort(Comparator.comparing(Quotation::getCreatedAt));
        RequestOrder requestOrder = requestOrderRepository.findByRequestID(request)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_ORDER_NOT_FOUND));

        Payment payment = Payment.builder()
                .paymentType("Paypal")
                .paymentDate(Instant.now())
                .amount(quotations.getLast().getCost())
                .status("Paid")
                .requestID(request)
                .build();

        request.setStatus("finished");
        request.setEndAt(Instant.now());

        requestOrder.setStatus("finished");
        requestOrder.setEndAt(Instant.now());

        paymentRepository.save(payment);
        requestOrderRepository.save(requestOrder);
        paymentRepository.save(payment);

        return paymentMapper.toPaymentResponse(payment);
    }
}
