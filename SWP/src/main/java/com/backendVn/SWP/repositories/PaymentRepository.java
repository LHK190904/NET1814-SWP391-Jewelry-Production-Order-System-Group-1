package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    List<Payment> findTop10ByOrderByPaymentDateDesc();

    Optional<Payment> findByIdAndPaymentType(int id, String paymentType);
}