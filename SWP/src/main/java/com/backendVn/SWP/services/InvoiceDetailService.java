package com.backendVn.SWP.services;

import com.backendVn.SWP.dtos.request.InvoiceDetailUpdateRequest;
import com.backendVn.SWP.dtos.response.InvoiceDetailResponse;
import com.backendVn.SWP.entities.Invoice;
import com.backendVn.SWP.entities.InvoiceDetail;
import com.backendVn.SWP.entities.Material;
import com.backendVn.SWP.exception.AppException;
import com.backendVn.SWP.exception.ErrorCode;
import com.backendVn.SWP.mappers.InvoiceDetailMapper;
import com.backendVn.SWP.repositories.InvoiceDetailRepository;
import com.backendVn.SWP.repositories.InvoiceRepository;
import com.backendVn.SWP.repositories.MaterialRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InvoiceDetailService {
    InvoiceDetailRepository invoiceDetailRepository;
    InvoiceRepository invoiceRepository;
    MaterialRepository materialRepository;
    InvoiceDetailMapper invoiceDetailMapper;

    public InvoiceDetailResponse createInvoiceDetail(Integer invoiceId, Integer materialId) {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_FOUND));

        Material material = materialRepository.findById(materialId)
                .orElseThrow(() -> new AppException(ErrorCode.MATERIAL_NOT_FOUND));

        InvoiceDetail invoiceDetail = InvoiceDetail.builder()
                .invoiceID(invoice)
                .materialID(material)
                .build();
        return invoiceDetailMapper.toInvoiceDetailResponse(invoiceDetailRepository.save(invoiceDetail));
    }

    public InvoiceDetailResponse updateInvoiceDetail(Integer id, InvoiceDetailUpdateRequest invoiceDetailUpdateRequest) {
        InvoiceDetail invoiceDetail = invoiceDetailRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_DETAIL_NOT_FOUND));

        // Update logic here

        InvoiceDetail updatedInvoiceDetail = invoiceDetailRepository.save(invoiceDetail);
        return invoiceDetailMapper.toInvoiceDetailResponse(updatedInvoiceDetail);
    }

    public void deleteInvoiceDetail(Integer id) {
        InvoiceDetail invoiceDetail = invoiceDetailRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_DETAIL_NOT_FOUND));
        invoiceDetailRepository.delete(invoiceDetail);
    }

    public List<InvoiceDetailResponse> getAllInvoiceDetails() {
        return invoiceDetailRepository.findAll().stream()
                .map(invoiceDetailMapper::toInvoiceDetailResponse)
                .toList();
    }

    public InvoiceDetailResponse getInvoiceDetailById(Integer id) {
        InvoiceDetail invoiceDetail = invoiceDetailRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_DETAIL_NOT_FOUND));
        return invoiceDetailMapper.toInvoiceDetailResponse(invoiceDetail);
    }
}
