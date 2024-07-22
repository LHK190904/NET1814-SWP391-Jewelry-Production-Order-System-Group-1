package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.response.PaymentResponse;
import com.backendVn.SWP.entities.Payment;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class PaymentMapperImpl implements PaymentMapper {

    @Override
    public PaymentResponse toPaymentResponse(Payment payment) {
        if ( payment == null ) {
            return null;
        }

        PaymentResponse.PaymentResponseBuilder paymentResponse = PaymentResponse.builder();

        paymentResponse.id( payment.getId() );
        paymentResponse.requestID( payment.getRequestID() );
        paymentResponse.amount( payment.getAmount() );
        paymentResponse.paymentDate( payment.getPaymentDate() );
        paymentResponse.paymentType( payment.getPaymentType() );
        paymentResponse.status( payment.getStatus() );

        return paymentResponse.build();
    }
}
