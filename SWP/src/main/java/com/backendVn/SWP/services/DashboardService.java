package com.backendVn.SWP.services;

import com.backendVn.SWP.dtos.response.RevenueEachMonth;
import com.backendVn.SWP.entities.Invoice;
import com.backendVn.SWP.entities.Quotation;
import com.backendVn.SWP.repositories.InvoiceRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.Year;
import java.time.ZoneId;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DashboardService {
    InvoiceRepository invoiceRepository;
    public List<RevenueEachMonth> sumRevenuePerMonth (){
        int currentYear = Year.now().getValue();
        Instant start = Year.of(currentYear).atDay(1).atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant end = Year.of(currentYear).atMonth(12).atEndOfMonth().atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant();

        List<Invoice> invoices = invoiceRepository.findByCreatedAtBetween(start, end);
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
}
