package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByUserName(String userName);
    boolean existsByUserName(String userName);
}