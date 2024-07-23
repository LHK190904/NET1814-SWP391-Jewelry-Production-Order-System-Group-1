package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Quotation;
import com.backendVn.SWP.entities.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface QuotationRepository extends JpaRepository<Quotation, Integer> {
    Optional<List<Quotation>> findByRequestID(Request request);
    List<Quotation> findByCreatedAtBetween(Instant start, Instant end);
    Quotation findFirstByRequestID(Request request);
}