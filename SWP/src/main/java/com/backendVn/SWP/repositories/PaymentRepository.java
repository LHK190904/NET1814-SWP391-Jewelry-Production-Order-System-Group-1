package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}