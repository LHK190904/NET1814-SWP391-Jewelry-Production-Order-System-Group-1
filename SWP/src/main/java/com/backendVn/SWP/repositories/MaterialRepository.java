package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Material;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;

public interface MaterialRepository extends JpaRepository<Material, Integer> {
    Optional<Material> findByMaterialNameAndUpdateTime(String materialName, Instant updateTime);

    Material findByMaterialName(String materialName);
}