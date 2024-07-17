package com.backendVn.SWP.services;

import com.backendVn.SWP.dtos.response.*;
import com.backendVn.SWP.entities.*;
import com.backendVn.SWP.repositories.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.Year;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DashboardService {
    InvoiceRepository invoiceRepository;
    RequestOrderRepository requestOrderRepository;
    UserRepository userRepository;
    QuotationRepository quotationRepository;
    RequestRepository requestRepository;

    public List<RevenueEachMonth> sumRevenuePerMonth (){
        List<Invoice> invoices = getInvoicesForCurrentYear();

        Map<Integer, BigDecimal> revenueMap = new HashMap<>();
        for (Invoice invoice : invoices) {
            int month = invoice.getCreatedAt().atZone(ZoneId.systemDefault()).getMonthValue();
            revenueMap.put(month, revenueMap.getOrDefault(month, BigDecimal.ZERO).add(invoice.getTotalCost()));
        }

        List<RevenueEachMonth> revenueEachMonths = new ArrayList<>();
        for (Map.Entry<Integer, BigDecimal> entry : revenueMap.entrySet()) {
            revenueEachMonths.add(new RevenueEachMonth(entry.getKey(), entry.getValue()));
        }

        revenueEachMonths.sort(Comparator.comparingInt(RevenueEachMonth::getMonth));
        return revenueEachMonths;
    }

    public BigDecimal averageOrderValue() {
        List<Invoice> invoices = getInvoicesForCurrentYear();
        if (invoices.isEmpty()) {
            return BigDecimal.ZERO;
        }

        BigDecimal totalValue = BigDecimal.ZERO;
        for (Invoice invoice : invoices) {
            totalValue = totalValue.add(invoice.getTotalCost());
        }

        return totalValue.divide(BigDecimal.valueOf(invoices.size()), RoundingMode.HALF_UP);
    }


    public List<ProductionStaffKPI> getProductionStaffKPI() {
        List<RequestOrder> requestOrders = getRequestOrdersForCurrentYear();
        Map<Integer, Long> orderCountMap = requestOrders.stream()
                .collect(Collectors.groupingBy(ro -> ro.getProductionStaff().getId(), Collectors.counting()));
        List<ProductionStaffKPI> kpiList = new ArrayList<>();
        for (Map.Entry<Integer, Long> entry : orderCountMap.entrySet()) {
//            User staff = userRepository.findById(entry.getKey()).orElse(null);
//            if (staff != null) {
//                kpiList.add(new ProductionStaffKPI(entry.getKey(), staff.getUserName(), entry.getValue()));
//            }
            userRepository.findById(entry.getKey()).ifPresent(staff
                    -> kpiList.add(new ProductionStaffKPI(entry.getKey(), staff.getUserName(), entry.getValue())));
        }
        return kpiList;
    }

    private List<Invoice> getInvoicesForCurrentYear() {
        Instant[] dateRange = getCurrentYearDateRange();
        return invoiceRepository.findByCreatedAtBetween(dateRange[0], dateRange[1]);
    }

    private List<RequestOrder> getRequestOrdersForCurrentYear() {
        Instant[] dateRange = getCurrentYearDateRange();
        return requestOrderRepository.findByCreatedAtBetween(dateRange[0], dateRange[1]);
    }

    private Instant[] getCurrentYearDateRange() {
        int currentYear = Year.now().getValue();
        Instant start = Year.of(currentYear).atDay(1).atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant end = Year.of(currentYear).atMonth(12).atEndOfMonth().atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant();
        return new Instant[]{start, end};
    }

    public List<MonthlyIncomeResponse> calculateMonthlyRevenue(int year, int startMonth, int endMonth) {
        List<MonthlyIncomeResponse> monthlyRevenues = new ArrayList<>();

        for (int month = startMonth; month <= endMonth; month++) {
            Instant startDate = Year.of(year).atMonth(month).atDay(1).atStartOfDay(ZoneId.systemDefault()).toInstant();
            Instant endDate = Year.of(year).atMonth(month).atEndOfMonth().atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant();

            BigDecimal totalRevenue = calculateTotalRevenue(startDate, endDate);
            monthlyRevenues.add(new MonthlyIncomeResponse(month, totalRevenue));
        }

        return monthlyRevenues;
    }

    public BigDecimal calculateTotalRevenue(Instant startDate, Instant endDate) {
        List<Invoice> invoices = invoiceRepository.findByCreatedAtBetween(startDate, endDate);
        return invoices.stream()
                .map(Invoice::getTotalCost)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public List<MonthlyIncomeResponse> calculateMonthlyProfit(int year, int startMonth, int endMonth) {
        List<MonthlyIncomeResponse> monthlyProfits = new ArrayList<>();

        for (int month = startMonth; month <= endMonth; month++) {
            Instant startDate = Year.of(year).atMonth(month).atDay(1).atStartOfDay(ZoneId.systemDefault()).toInstant();
            Instant endDate = Year.of(year).atMonth(month).atEndOfMonth().atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant();

            BigDecimal totalProfit = calculateTotalProfit(startDate, endDate);
            monthlyProfits.add(new MonthlyIncomeResponse(month, totalProfit));
        }

        return monthlyProfits;
    }

    public BigDecimal calculateTotalProfit(Instant startDate, Instant endDate) {
        BigDecimal totalRevenue = calculateTotalRevenue(startDate, endDate);
        BigDecimal totalExpense = quotationRepository.findByCreatedAtBetween(startDate, endDate).stream()
                .map(Quotation::getCapitalCost)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return totalRevenue.subtract(totalExpense);
    }

    public List<MonthlyIncomeResponse> calculateMonthlyAverageOrderValue(int year, int startMonth, int endMonth) {
        List<MonthlyIncomeResponse> monthlyAverageOrderValues = new ArrayList<>();

        for (int month = startMonth; month <= endMonth; month++) {
            Instant startDate = Year.of(year).atMonth(month).atDay(1).atStartOfDay(ZoneId.systemDefault()).toInstant();
            Instant endDate = Year.of(year).atMonth(month).atEndOfMonth().atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant();

            BigDecimal averageOrderValue = calculateAverageOrderValue(startDate, endDate);
            monthlyAverageOrderValues.add(new MonthlyIncomeResponse(month, averageOrderValue));
        }

        return monthlyAverageOrderValues;
    }


    public BigDecimal calculateAverageOrderValue(Instant startDate, Instant endDate) {
        List<Invoice> invoices = invoiceRepository.findByCreatedAtBetween(startDate, endDate);
        if (invoices.isEmpty()) {
            return BigDecimal.ZERO;
        }
        BigDecimal totalRevenue = invoices.stream()
                .map(Invoice::getTotalCost)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return totalRevenue.divide(BigDecimal.valueOf(invoices.size()), RoundingMode.HALF_UP);
    }

    public List<KpiResponse> calculateKpi(Instant startDate, Instant endDate) {
        List<RequestOrder> requestOrders = requestOrderRepository.findByCreatedAtBetween(startDate, endDate);
        List<Request> requests = requestRepository.findByCreatedAtBetween(startDate, endDate);

        // Tạo map để đếm số lượng đơn hàng mỗi nhân viên thầu
        Map<Integer, Long> staffOrderCount = new HashMap<>();

        for (RequestOrder requestOrder : requestOrders) {
            countStaffOrders(staffOrderCount, requestOrder.getDesignStaff().getId());
            countStaffOrders(staffOrderCount, requestOrder.getProductionStaff().getId());
        }

        for (Request request : requests) {
            countStaffOrders(staffOrderCount, request.getSaleStaffid().getId());
        }

        // Tạo danh sách kết quả KPI
        List<KpiResponse> kpiResponses = new ArrayList<>();
        for (Map.Entry<Integer, Long> entry : staffOrderCount.entrySet()) {
            Integer staffId = entry.getKey();
            Long orderCount = entry.getValue();
            User staff = userRepository.findById(staffId).orElse(null);
            if (staff != null) {
                KpiResponse kpiResponse = new KpiResponse(staff.getUserName(), staff.getTitle(), orderCount);
                kpiResponses.add(kpiResponse);
            }
        }
        return kpiResponses;
    }

    private void countStaffOrders(Map<Integer, Long> staffOrderCount, Integer staffId) {
        if (staffId != null) {
            staffOrderCount.put(staffId, staffOrderCount.getOrDefault(staffId, 0L) + 1);
        }
    }

    public List<MonthlyOrderCountResponse> calculateMonthlyOrderCount(int year, int startMonth, int endMonth) {
        List<MonthlyOrderCountResponse> monthlyOrderCounts = new ArrayList<>();

        for (int month = startMonth; month <= endMonth; month++) {
            Instant startDate = Year.of(year).atMonth(month).atDay(1).atStartOfDay(ZoneId.systemDefault()).toInstant();
            Instant endDate = Year.of(year).atMonth(month).atEndOfMonth().atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant();

            Long orderCount = countOrders(startDate, endDate);
            monthlyOrderCounts.add(new MonthlyOrderCountResponse(month, orderCount));
        }

        return monthlyOrderCounts;
    }

    public Long countOrders(Instant startDate, Instant endDate) {
        return invoiceRepository.countByCreatedAtBetween(startDate, endDate);
    }
}
