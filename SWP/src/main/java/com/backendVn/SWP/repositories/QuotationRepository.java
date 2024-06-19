package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuotationRepository extends JpaRepository<Quotation, Integer> {
  }