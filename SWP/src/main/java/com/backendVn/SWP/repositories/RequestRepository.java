package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.Design;
import com.backendVn.SWP.entities.Request;
import com.backendVn.SWP.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Integer> {
    List<Request> findByStatus(String pendingQuotation);

    List<Request> findAllBySaleStaffid(User user);

    List<Request> findAllBySaleStaffidNull();

    List<Request> findAllByCustomerIDAndStatusIsNotLike(User customer, String status);

    List<Request> findByCreatedAtBetween(Instant startDate, Instant endDate);

    List<Request> findAllByCompanyDesignIsNotNull();

    Request findFirstByCompanyDesign(Design design);
}