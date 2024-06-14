package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Request;
import com.backendVn.SWP.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Integer> {
    @Query("SELECT request FROM Request request WHERE request.saleStaffID is null ")
    List<Request> findByCondition();

    @Query("SELECT request FROM Request request WHERE request.saleStaffID = :saleStaffId")
    List<Request> findBySaleStaffID(@Param("saleStaffId") User saleStaffId);
}