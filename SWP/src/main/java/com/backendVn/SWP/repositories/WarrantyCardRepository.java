package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.WarrantyCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WarrantyCardRepository extends JpaRepository<WarrantyCard, Integer> {
  }