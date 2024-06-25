package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Process;
import com.backendVn.SWP.entities.RequestOrder;
import com.backendVn.SWP.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProcessRepository extends JpaRepository<Process, Integer> {
    List<Process> findByRequestOrderID(RequestOrder requestOrder);
    List<Process> findByUpdatedBy(User user);
}