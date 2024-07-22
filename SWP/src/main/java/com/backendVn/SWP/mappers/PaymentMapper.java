package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.response.PaymentResponse;
import com.backendVn.SWP.entities.Payment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PaymentMapper {
    PaymentResponse toPaymentResponse(Payment payment);
}
