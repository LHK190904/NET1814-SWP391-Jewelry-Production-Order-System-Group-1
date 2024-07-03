package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Design;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DesignRepository extends JpaRepository<Design, Integer> {
    Optional<List<Design>> findByDesignNameIsNotLike(String designName);
}