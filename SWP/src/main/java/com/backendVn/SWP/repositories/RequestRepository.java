package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Request;
import com.backendVn.SWP.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Integer> {
    List<Request> findAllByCustomerID(User customerId);
    @Query("SELECT request FROM Request request WHERE request.saleStaffID is null")
    List<Request> findUnrecievedBySaleStaff();
    List<Request> findAllBySaleStaffIDNull();
    List<Request> findAllBySaleStaffID(User saleStaffId);
}