package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Process;
import com.backendVn.SWP.entities.RequestOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProcessRepository extends JpaRepository<Process, Integer> {
    Optional<Process> findByRequestOrderID(RequestOrder requestOrder);
}