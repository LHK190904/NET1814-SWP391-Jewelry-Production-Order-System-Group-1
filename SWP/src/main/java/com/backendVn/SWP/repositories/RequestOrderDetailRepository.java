package com.backendVn.SWP.repositories;

import com.backendVn.SWP.entities.RequestOrderDetail;
import com.backendVn.SWP.entities.RequestOrderDetailId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestOrderDetailRepository extends JpaRepository<RequestOrderDetail, RequestOrderDetailId> {
}