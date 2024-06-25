package com.backendVn.SWP.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
      List<Invoice> findByCreatedAtBetween(Instant start, Instant end);
}