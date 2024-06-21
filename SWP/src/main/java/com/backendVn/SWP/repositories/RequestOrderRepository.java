package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.RequestOrder;
import com.backendVn.SWP.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestOrderRepository extends JpaRepository<RequestOrder, Integer> {
List<RequestOrder> findAllByDesignStaff(User designStaff);
}