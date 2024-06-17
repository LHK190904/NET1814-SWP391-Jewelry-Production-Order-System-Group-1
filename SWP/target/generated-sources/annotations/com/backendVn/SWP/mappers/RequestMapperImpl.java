package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.RequestCreationRequest;
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
    public Request toRequest(RequestCreationRequest requestCreationRequest) {
        if ( requestCreationRequest == null ) {
            return null;
        }

        Request request = new Request();

        request.setDescription( requestCreationRequest.getDescription() );

        return request;
    }

    @Override
    public void updateRequestFromDto(Request request, RequestCreationRequest requestCreationRequest) {
        if ( requestCreationRequest == null ) {
            return;
        }

        request.setDescription( requestCreationRequest.getDescription() );
    }

    @Override
    public RequestResponse toRequestResponse(Request request) {
        if ( request == null ) {
            return null;
        }

        RequestResponse.RequestResponseBuilder requestResponse = RequestResponse.builder();

        requestResponse.customerID( requestCustomerIDId( request ) );
        requestResponse.saleStaffID( requestSaleStaffIDId( request ) );
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

    private Integer requestSaleStaffIDId(Request request) {
        if ( request == null ) {
            return null;
        }
        User saleStaffID = request.getSaleStaffID();
        if ( saleStaffID == null ) {
            return null;
        }
        Integer id = saleStaffID.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
