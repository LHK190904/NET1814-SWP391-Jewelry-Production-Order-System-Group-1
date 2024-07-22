package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.response.PaymentResponse;
import com.backendVn.SWP.entities.Payment;
import com.backendVn.SWP.entities.Request;
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

        paymentResponse.requestID( paymentRequestIDId( payment ) );
        paymentResponse.id( payment.getId() );
        paymentResponse.amount( payment.getAmount() );
        paymentResponse.paymentDate( payment.getPaymentDate() );
        paymentResponse.paymentType( payment.getPaymentType() );
        paymentResponse.status( payment.getStatus() );

        return paymentResponse.build();
    }

    private Integer paymentRequestIDId(Payment payment) {
        if ( payment == null ) {
            return null;
        }
        Request requestID = payment.getRequestID();
        if ( requestID == null ) {
            return null;
        }
        Integer id = requestID.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
