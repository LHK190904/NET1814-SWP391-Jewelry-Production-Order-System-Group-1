package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Material;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialRepository extends JpaRepository<Material, Integer> {
}