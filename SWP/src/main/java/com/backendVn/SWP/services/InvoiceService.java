package com.backendVn.SWP.services;

import com.backendVn.SWP.dtos.request.InvoiceUpdateRequest;
import com.backendVn.SWP.dtos.response.InvoiceResponse;
import com.backendVn.SWP.entities.Invoice;
import com.backendVn.SWP.entities.Request;
import com.backendVn.SWP.exception.AppException;
import com.backendVn.SWP.exception.ErrorCode;
import com.backendVn.SWP.mappers.InvoiceMapper;
import com.backendVn.SWP.repositories.InvoiceRepository;
import com.backendVn.SWP.repositories.RequestRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InvoiceService {
    InvoiceRepository invoiceRepository;
    RequestRepository requestRepository;
    InvoiceMapper invoiceMapper;

    public InvoiceResponse createInvoice(Integer requestId) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_NOT_FOUND));

        Invoice invoice = invoiceRepository.findByRequestID(request)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_FOUND));

        if (invoice != null) return null;

        Invoice theInvoice = Invoice.builder()
                .requestID(request)
                .createdAt(Instant.now())
                .build();

        Invoice savedInvoice = invoiceRepository.save(theInvoice);
        return invoiceMapper.toInvoiceResponse(savedInvoice);
    }


    public InvoiceResponse updateInvoice(Integer id, InvoiceUpdateRequest invoiceUpdateRequest) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_FOUND));

        invoiceMapper.updateInvoice(invoice, invoiceUpdateRequest);

        return invoiceMapper.toInvoiceResponse(invoiceRepository.save(invoice));
    }

    public void deleteInvoice(Integer id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_FOUND));
        invoiceRepository.delete(invoice);
    }

    public List<InvoiceResponse> getAllInvoices() {
        return invoiceRepository.findAll().stream()
                .map(invoiceMapper::toInvoiceResponse)
                .toList();
    }

    public InvoiceResponse getInvoiceById(Integer id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_FOUND));
        return invoiceMapper.toInvoiceResponse(invoice);
    }
}
