package com.backendVn.SWP.services;

import com.backendVn.SWP.dtos.response.ProductionStaffKPI;
import com.backendVn.SWP.dtos.response.RevenueEachMonth;
import com.backendVn.SWP.repositories.InvoiceRepository;
import com.backendVn.SWP.repositories.RequestOrderRepository;
import com.backendVn.SWP.repositories.UserRepository;
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
    private final RequestOrderRepository requestOrderRepository;
    private final UserRepository userRepository;

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

    public long countOrders() {
        return getInvoicesForCurrentYear().size();
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
}
