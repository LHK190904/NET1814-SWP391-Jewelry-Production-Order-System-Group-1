package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.RequestCreationRequestForCustomerDesign;
import com.backendVn.SWP.dtos.response.RequestResponse;
import com.backendVn.SWP.entities.Design;
import com.backendVn.SWP.entities.Material;
import com.backendVn.SWP.entities.Request;
import com.backendVn.SWP.entities.User;
import java.util.ArrayList;
import java.util.List;
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
        requestResponse.mainStone( requestMainStoneId( request ) );
        requestResponse.subStone( requestSubStoneId( request ) );
        requestResponse.materialID( requestMaterialIDId( request ) );
        requestResponse.companyDesign( requestCompanyDesignId( request ) );
        requestResponse.id( request.getId() );
        requestResponse.description( request.getDescription() );
        requestResponse.status( request.getStatus() );
        requestResponse.createdAt( request.getCreatedAt() );
        requestResponse.recievedAt( request.getRecievedAt() );
        requestResponse.endAt( request.getEndAt() );
        requestResponse.materialWeight( request.getMaterialWeight() );
        requestResponse.category( request.getCategory() );
        requestResponse.produceCost( request.getProduceCost() );
        requestResponse.deniedReason( request.getDeniedReason() );

        return requestResponse.build();
    }

    @Override
    public RequestResponse toRequestResponseWithCustomerDesign(Request request, List<String> uRLImage) {
        if ( request == null && uRLImage == null ) {
            return null;
        }

        RequestResponse.RequestResponseBuilder requestResponse = RequestResponse.builder();

        if ( request != null ) {
            requestResponse.customerID( requestCustomerIDId( request ) );
            requestResponse.saleStaffID( requestSaleStaffidId( request ) );
            requestResponse.mainStone( requestMainStoneId( request ) );
            requestResponse.subStone( requestSubStoneId( request ) );
            requestResponse.materialID( requestMaterialIDId( request ) );
            requestResponse.companyDesign( requestCompanyDesignId( request ) );
            requestResponse.id( request.getId() );
            requestResponse.description( request.getDescription() );
            requestResponse.status( request.getStatus() );
            requestResponse.createdAt( request.getCreatedAt() );
            requestResponse.recievedAt( request.getRecievedAt() );
            requestResponse.endAt( request.getEndAt() );
            requestResponse.materialWeight( request.getMaterialWeight() );
            requestResponse.category( request.getCategory() );
            requestResponse.produceCost( request.getProduceCost() );
            requestResponse.deniedReason( request.getDeniedReason() );
        }
        List<String> list = uRLImage;
        if ( list != null ) {
            requestResponse.uRLImage( new ArrayList<String>( list ) );
        }

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

    private Integer requestMainStoneId(Request request) {
        if ( request == null ) {
            return null;
        }
        Material mainStone = request.getMainStone();
        if ( mainStone == null ) {
            return null;
        }
        Integer id = mainStone.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Integer requestSubStoneId(Request request) {
        if ( request == null ) {
            return null;
        }
        Material subStone = request.getSubStone();
        if ( subStone == null ) {
            return null;
        }
        Integer id = subStone.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Integer requestMaterialIDId(Request request) {
        if ( request == null ) {
            return null;
        }
        Material materialID = request.getMaterialID();
        if ( materialID == null ) {
            return null;
        }
        Integer id = materialID.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Integer requestCompanyDesignId(Request request) {
        if ( request == null ) {
            return null;
        }
        Design companyDesign = request.getCompanyDesign();
        if ( companyDesign == null ) {
            return null;
        }
        Integer id = companyDesign.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
