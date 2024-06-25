package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.RequestOrderDetailRequest;
import com.backendVn.SWP.dtos.response.RequestOrderDetailResponse;
import com.backendVn.SWP.entities.Material;
import com.backendVn.SWP.entities.RequestOrder;
import com.backendVn.SWP.entities.RequestOrderDetail;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class RequestOrderDetailMapperImpl implements RequestOrderDetailMapper {

    @Override
    public RequestOrderDetailResponse toRequestOrderDetailResponse(RequestOrderDetail requestOrderDetail) {
        if ( requestOrderDetail == null ) {
            return null;
        }

        RequestOrderDetailResponse.RequestOrderDetailResponseBuilder requestOrderDetailResponse = RequestOrderDetailResponse.builder();

        requestOrderDetailResponse.materialID( requestOrderDetailMaterialIDId( requestOrderDetail ) );
        requestOrderDetailResponse.requestOrderID( requestOrderDetailRequestOrderidId( requestOrderDetail ) );
        requestOrderDetailResponse.id( requestOrderDetail.getId() );
        requestOrderDetailResponse.weight( requestOrderDetail.getWeight() );

        return requestOrderDetailResponse.build();
    }

    @Override
    public RequestOrderDetail toRequestOrderDetail(RequestOrderDetailRequest requestOrderDetailRequest) {
        if ( requestOrderDetailRequest == null ) {
            return null;
        }

        RequestOrderDetail requestOrderDetail = new RequestOrderDetail();

        requestOrderDetail.setWeight( requestOrderDetailRequest.getWeight() );

        return requestOrderDetail;
    }

    @Override
    public void updateRequestOrderDetail(RequestOrderDetail requestOrderDetail, RequestOrderDetailRequest requestOrderDetailRequest) {
        if ( requestOrderDetailRequest == null ) {
            return;
        }

        requestOrderDetail.setWeight( requestOrderDetailRequest.getWeight() );
    }

    private Integer requestOrderDetailMaterialIDId(RequestOrderDetail requestOrderDetail) {
        if ( requestOrderDetail == null ) {
            return null;
        }
        Material materialID = requestOrderDetail.getMaterialID();
        if ( materialID == null ) {
            return null;
        }
        Integer id = materialID.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Integer requestOrderDetailRequestOrderidId(RequestOrderDetail requestOrderDetail) {
        if ( requestOrderDetail == null ) {
            return null;
        }
        RequestOrder requestOrderid = requestOrderDetail.getRequestOrderid();
        if ( requestOrderid == null ) {
            return null;
        }
        Integer id = requestOrderid.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
