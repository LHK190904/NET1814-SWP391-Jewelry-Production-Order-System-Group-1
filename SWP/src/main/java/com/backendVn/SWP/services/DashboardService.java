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
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DashboardService {

    InvoiceRepository invoiceRepository;
    public List<RevenueEachMonth> sumRevenuePerMonth (){
        List <Invoice> invoices= invoiceRepository.findAll();
        Collections.sort(invoices, new Comparator<Invoice>() {
            @Override
            public int compare(Invoice o1, Invoice o2) {
                return o1.getCreatedAt().compareTo(o2.getCreatedAt());
            }
        });

        RevenueEachMonth revenueEachMonth = new RevenueEachMonth();
        Integer month = 1;
        List <RevenueEachMonth> revenueEachMonths = new ArrayList<>();
        for (Invoice invoice : invoices) {
            revenueEachMonth.setMonth(month);
            if (invoice.getCreatedAt().atZone(ZoneId.systemDefault()).getMonth().getValue()==month){
            revenueEachMonth.setTotalRevenue((BigDecimal) revenueEachMonth.getTotalRevenue().add(invoice.getTotalCost()));
            }
            if(invoice.getCreatedAt().atZone(ZoneId.systemDefault()).getMonth().getValue()>month){
                month++;
                revenueEachMonths.add(revenueEachMonth);
                continue;
            }
        }
    return revenueEachMonths;
    }

}
