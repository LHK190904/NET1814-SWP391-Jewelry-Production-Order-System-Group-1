package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.QuotationCreationRequest;
import com.backendVn.SWP.dtos.response.QuotationResponse;
import com.backendVn.SWP.entities.Quotation;
import com.backendVn.SWP.entities.Request;
import java.util.Date;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class QuotationMapperImpl implements QuotationMapper {

    @Override
    public Quotation toQuotation(QuotationCreationRequest quotationCreationRequest) {
        if ( quotationCreationRequest == null ) {
            return null;
        }

        Quotation.QuotationBuilder quotation = Quotation.builder();

        quotation.cost( quotationCreationRequest.getCost() );

        return quotation.build();
    }

    @Override
    public QuotationResponse toQuotationResponse(Quotation quotation) {
        if ( quotation == null ) {
            return null;
        }

        QuotationResponse.QuotationResponseBuilder quotationResponse = QuotationResponse.builder();

        Integer id = quotationRequestIDId( quotation );
        if ( id != null ) {
            quotationResponse.requestID( id );
        }
        if ( quotation.getId() != null ) {
            quotationResponse.id( quotation.getId() );
        }
        if ( quotation.getCreatedAt() != null ) {
            quotationResponse.createdAt( Date.from( quotation.getCreatedAt() ) );
        }
        quotationResponse.cost( quotation.getCost() );

        return quotationResponse.build();
    }

    private Integer quotationRequestIDId(Quotation quotation) {
        if ( quotation == null ) {
            return null;
        }
        Request requestID = quotation.getRequestID();
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
