package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
  }