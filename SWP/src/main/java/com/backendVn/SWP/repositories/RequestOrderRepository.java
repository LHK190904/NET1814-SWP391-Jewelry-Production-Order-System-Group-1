package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.RequestOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestOrderRepository extends JpaRepository<RequestOrder, Integer> {
}