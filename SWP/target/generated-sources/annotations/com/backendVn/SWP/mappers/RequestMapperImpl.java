package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.RequestCreationRequest;
import com.backendVn.SWP.dtos.request.RequestUpdateRequest;
import com.backendVn.SWP.dtos.response.RequestResponse;
import com.backendVn.SWP.entities.Request;
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

        return request;
    }

    @Override
    public void updateRequestFromDto(Request request, RequestUpdateRequest requestUpdateRequest) {
        if ( requestUpdateRequest == null ) {
            return;
        }

        request.setRecievedAt( requestUpdateRequest.getRecievedAt() );
        request.setEndAt( requestUpdateRequest.getEndAt() );
        request.setStatus( requestUpdateRequest.getStatus() );
    }

    @Override
    public RequestResponse toRequestResponse(Request request) {
        if ( request == null ) {
            return null;
        }

        RequestResponse.RequestResponseBuilder requestResponse = RequestResponse.builder();

        requestResponse.status( request.getStatus() );
        requestResponse.createdAt( request.getCreatedAt() );
        requestResponse.recievedAt( request.getRecievedAt() );
        requestResponse.endAt( request.getEndAt() );

        return requestResponse.build();
    }
}
