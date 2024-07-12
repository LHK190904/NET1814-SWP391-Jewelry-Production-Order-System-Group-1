package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.InvoiceDetailUpdateRequest;
import com.backendVn.SWP.dtos.response.InvoiceDetailResponse;
import com.backendVn.SWP.entities.Invoice;
import com.backendVn.SWP.entities.InvoiceDetail;
import com.backendVn.SWP.entities.Material;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class InvoiceDetailMapperImpl implements InvoiceDetailMapper {

    @Override
    public void updateInvoiceDetail(InvoiceDetail invoiceDetail, InvoiceDetailUpdateRequest invoiceDetailUpdateRequest) {
        if ( invoiceDetailUpdateRequest == null ) {
            return;
        }

        invoiceDetail.setTotalAmount( invoiceDetailUpdateRequest.getTotalAmount() );
        invoiceDetail.setTotalCost( invoiceDetailUpdateRequest.getTotalCost() );
    }

    @Override
    public InvoiceDetailResponse toInvoiceDetailResponse(InvoiceDetail invoiceDetail) {
        if ( invoiceDetail == null ) {
            return null;
        }

        InvoiceDetailResponse.InvoiceDetailResponseBuilder invoiceDetailResponse = InvoiceDetailResponse.builder();

        invoiceDetailResponse.invoiceID( invoiceDetailInvoiceIDId( invoiceDetail ) );
        invoiceDetailResponse.materialID( invoiceDetailMaterialIDId( invoiceDetail ) );
        invoiceDetailResponse.id( invoiceDetail.getId() );
        invoiceDetailResponse.totalAmount( invoiceDetail.getTotalAmount() );
        invoiceDetailResponse.totalCost( invoiceDetail.getTotalCost() );

        return invoiceDetailResponse.build();
    }

    private Integer invoiceDetailInvoiceIDId(InvoiceDetail invoiceDetail) {
        if ( invoiceDetail == null ) {
            return null;
        }
        Invoice invoiceID = invoiceDetail.getInvoiceID();
        if ( invoiceID == null ) {
            return null;
        }
        Integer id = invoiceID.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Integer invoiceDetailMaterialIDId(InvoiceDetail invoiceDetail) {
        if ( invoiceDetail == null ) {
            return null;
        }
        Material materialID = invoiceDetail.getMaterialID();
        if ( materialID == null ) {
            return null;
        }
        Integer id = materialID.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}