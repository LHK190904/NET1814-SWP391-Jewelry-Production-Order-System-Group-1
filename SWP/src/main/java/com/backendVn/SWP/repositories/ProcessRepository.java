package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Process;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessRepository extends JpaRepository<Process, Integer> {
}