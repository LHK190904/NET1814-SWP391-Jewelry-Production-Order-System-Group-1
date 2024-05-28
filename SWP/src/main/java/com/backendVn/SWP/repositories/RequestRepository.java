package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<Request, Integer> {
}