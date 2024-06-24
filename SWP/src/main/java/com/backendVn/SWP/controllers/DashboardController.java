package com.backendVn.SWP.controllers;

import com.backendVn.SWP.dtos.response.ApiResponse;
import com.backendVn.SWP.dtos.response.RevenueEachMonth;
import com.backendVn.SWP.services.DashboardService;
import com.backendVn.SWP.services.InvoiceService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/revenue/month/")
    public ApiResponse<List<RevenueEachMonth>> getRevenuePerMonth() {
        List<RevenueEachMonth> revenue = dashboardService.sumRevenuePerMonth();
        return ApiResponse.<List<RevenueEachMonth>>builder()
                .result(revenue)
                .build();
    }

    @GetMapping("/average-order-value")
    public ApiResponse<BigDecimal> getAverageOrderValue() {
        BigDecimal averageOrderValue = dashboardService.averageOrderValue();
        return ApiResponse.<BigDecimal>builder()
                .result(averageOrderValue)
                .build();
    }

    @GetMapping("/order-count")
    public ApiResponse<Long> getOrderCount() {
        long orderCount = dashboardService.countOrders();
        return ApiResponse.<Long>builder()
                .result(orderCount)
                .build();
    }
}
