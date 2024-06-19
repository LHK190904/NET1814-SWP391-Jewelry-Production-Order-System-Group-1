package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.InvoiceDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail, Integer> {
  }