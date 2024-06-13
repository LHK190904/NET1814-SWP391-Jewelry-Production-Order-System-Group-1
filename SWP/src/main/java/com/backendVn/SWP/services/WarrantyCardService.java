package com.backendVn.SWP.services;

import com.backendVn.SWP.dtos.request.WarrantyCardCreationRequest;
import com.backendVn.SWP.dtos.response.WarrantyCardResponse;
import com.backendVn.SWP.entities.RequestOrder;
import com.backendVn.SWP.entities.WarrantyCard;
import com.backendVn.SWP.exception.AppException;
import com.backendVn.SWP.exception.ErrorCode;
import com.backendVn.SWP.mappers.WarrantyCardMapper;
import com.backendVn.SWP.repositories.RequestOrderRepository;
import com.backendVn.SWP.repositories.WarrantyCardRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WarrantyCardService {
    WarrantyCardRepository warrantyCardRepository;
    RequestOrderRepository requestOrderRepository;
    WarrantyCardMapper warrantyCardMapper;

    public WarrantyCardResponse createWarrantyCard(Integer id,WarrantyCardCreationRequest warrantyCardCreationRequest) {
        RequestOrder requestOrder = requestOrderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_ORDER_NOT_FOUND));

        WarrantyCard warrantyCard = warrantyCardMapper.toWarrantyCard(warrantyCardCreationRequest);
        warrantyCard.setRequestOrder(requestOrder);
        warrantyCard.setCreatedAt(Instant.now());

        requestOrder.setEndAt(Instant.now());
        requestOrderRepository.save(requestOrder);
        WarrantyCard savedWarrantyCard = warrantyCardRepository.save(warrantyCard);

        return warrantyCardMapper.toWarrantyCardResponse(savedWarrantyCard);
    }

    public WarrantyCardResponse updateWarrantyCard(Integer id, WarrantyCardCreationRequest warrantyCardCreationRequest) {
        WarrantyCard warrantyCard = warrantyCardRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_ORDER_NOT_FOUND));
        warrantyCardMapper.updateWarranty(warrantyCard, warrantyCardCreationRequest);

        return warrantyCardMapper.toWarrantyCardResponse(warrantyCard);
    }

    public void deleteWarrantyCard(Integer id) {
        WarrantyCard warrantyCard = warrantyCardRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.WARRANTY_CARD_NOT_FOUND));
        warrantyCardRepository.delete(warrantyCard);
    }

    public List<WarrantyCardResponse> getAllWarrantyCards() {
        return warrantyCardRepository.findAll().stream()
                .map(warrantyCardMapper::toWarrantyCardResponse)
                .toList();
    }

    public WarrantyCardResponse getWarrantyCardById(Integer id) {
        WarrantyCard warrantyCard = warrantyCardRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.WARRANTY_CARD_NOT_FOUND));
        return warrantyCardMapper.toWarrantyCardResponse(warrantyCard);
    }
}

