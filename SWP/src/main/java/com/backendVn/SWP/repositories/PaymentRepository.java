package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    List<Payment> findTop10ByOrderByPaymentDateDesc();
}