package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Quotation;
import com.backendVn.SWP.entities.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QuotationRepository extends JpaRepository<Quotation, Integer> {
    Optional<List<Quotation>> findByRequestID(Request request);

    @Query("SELECT q FROM Quotation q INNER JOIN Request r ON q.requestID.id = r.id WHERE r.saleStaffid.id = :staffId")
    Optional<List<Quotation>> findByStaffId(@Param("staffId") Integer staffId);
}