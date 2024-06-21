package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Quotation;
import com.backendVn.SWP.entities.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuotationRepository extends JpaRepository<Quotation, Integer> {
    Optional<List<Quotation>> findByRequestID(Request request);
}