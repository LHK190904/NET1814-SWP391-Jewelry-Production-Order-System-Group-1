package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.RequestCreationRequestForCustomerDesign;
import com.backendVn.SWP.dtos.response.RequestResponse;
import com.backendVn.SWP.entities.Request;
import com.backendVn.SWP.entities.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class RequestMapperImpl implements RequestMapper {

    @Override
    public Request toRequest(RequestCreationRequestForCustomerDesign requestCreationRequestForCustomerDesign) {
        if ( requestCreationRequestForCustomerDesign == null ) {
            return null;
        }

        Request.RequestBuilder request = Request.builder();

        request.description( requestCreationRequestForCustomerDesign.getDescription() );
        request.materialWeight( requestCreationRequestForCustomerDesign.getMaterialWeight() );
        request.category( requestCreationRequestForCustomerDesign.getCategory() );

        request.createdAt( java.time.Instant.now() );
        request.status( "Unapproved" );

        return request.build();
    }

    @Override
    public void updateRequestFromDto(Request request, RequestCreationRequestForCustomerDesign requestCreationRequestForCustomerDesign) {
        if ( requestCreationRequestForCustomerDesign == null ) {
            return;
        }

        request.setDescription( requestCreationRequestForCustomerDesign.getDescription() );
        request.setMaterialWeight( requestCreationRequestForCustomerDesign.getMaterialWeight() );
        request.setCategory( requestCreationRequestForCustomerDesign.getCategory() );
    }

    @Override
    public RequestResponse toRequestResponse(Request request) {
        if ( request == null ) {
            return null;
        }

        RequestResponse.RequestResponseBuilder requestResponse = RequestResponse.builder();

        requestResponse.customerID( requestCustomerIDId( request ) );
        requestResponse.saleStaffID( requestSaleStaffidId( request ) );
        requestResponse.id( request.getId() );
        requestResponse.description( request.getDescription() );
        requestResponse.status( request.getStatus() );
        requestResponse.createdAt( request.getCreatedAt() );
        requestResponse.recievedAt( request.getRecievedAt() );
        requestResponse.endAt( request.getEndAt() );

        return requestResponse.build();
    }

    private Integer requestCustomerIDId(Request request) {
        if ( request == null ) {
            return null;
        }
        User customerID = request.getCustomerID();
        if ( customerID == null ) {
            return null;
        }
        Integer id = customerID.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Integer requestSaleStaffidId(Request request) {
        if ( request == null ) {
            return null;
        }
        User saleStaffid = request.getSaleStaffid();
        if ( saleStaffid == null ) {
            return null;
        }
        Integer id = saleStaffid.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
