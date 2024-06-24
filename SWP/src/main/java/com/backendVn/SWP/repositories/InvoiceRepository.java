package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
      List<Invoice> findByCreatedAtBetween(Instant start, Instant end);
}