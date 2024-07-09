package com.backendVn.SWP.controllers;

import com.backendVn.SWP.dtos.response.KpiResponse;
import com.backendVn.SWP.dtos.response.ProductionStaffKPI;
import com.backendVn.SWP.dtos.response.ApiResponse;
import com.backendVn.SWP.dtos.response.RevenueEachMonth;
import com.backendVn.SWP.services.DashboardService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/revenue")
    public ApiResponse<BigDecimal> getTotalRevenue(
            @RequestParam("startDate") Instant startDate, @RequestParam("endDate") Instant endDate) {
        return ApiResponse.<BigDecimal>builder()
                .result(dashboardService.calculateTotalRevenue(startDate, endDate))
                .build();
    }


    @GetMapping("/profit")
    public ApiResponse<BigDecimal> getTotalProfit(
            @RequestParam("startDate") Instant startDate, @RequestParam("endDate") Instant endDate) {
        return ApiResponse.<BigDecimal>builder()
                .result(dashboardService.calculateTotalProfit(startDate, endDate))
                .build();
    }

    @GetMapping("/average-order-value")
    public ApiResponse<BigDecimal> getAverageOrderValue(
            @RequestParam("startDate") Instant startDate, @RequestParam("endDate") Instant endDate) {
        return ApiResponse.<BigDecimal>builder()
                .result(dashboardService.calculateAverageOrderValue(startDate, endDate))
                .build();
    }

    @GetMapping("/order-count")
    public ApiResponse<Long> getOrderCount(
            @RequestParam("startDate") Instant startDate, @RequestParam("endDate") Instant endDate) {
        return ApiResponse.<Long>builder()
                .result(dashboardService.countOrders(startDate, endDate))
                .build();
    }


    @GetMapping("/kpi")
    public ApiResponse<List<KpiResponse>> getKpi(
            @RequestParam("startDate") Instant startDate, @RequestParam("endDate") Instant endDate) {
        return ApiResponse.<List<KpiResponse>>builder()
                .result(dashboardService.calculateKpi(startDate, endDate))
                .build();
    }

    @GetMapping("/revenue/month/1")
    public ApiResponse<List<RevenueEachMonth>> getRevenuePerMonth() {
        List<RevenueEachMonth> revenue = dashboardService.sumRevenuePerMonth();
        return ApiResponse.<List<RevenueEachMonth>>builder()
                .result(revenue)
                .build();
    }

    @GetMapping("/average-order-value1")
    public ApiResponse<BigDecimal> getAverageOrderValue() {
        BigDecimal averageOrderValue = dashboardService.averageOrderValue();
        return ApiResponse.<BigDecimal>builder()
                .result(averageOrderValue)
                .build();
    }

    @GetMapping("/production-staff-kpi1")
    public ApiResponse<List<ProductionStaffKPI>> getProductionStaffKPI() {
        List<ProductionStaffKPI> kpiList = dashboardService.getProductionStaffKPI();
        return ApiResponse.<List<ProductionStaffKPI>>builder()
                .result(kpiList)
                .build();
    }
}
