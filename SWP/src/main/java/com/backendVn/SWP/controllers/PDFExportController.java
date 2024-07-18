package com.backendVn.SWP.controllers;


import com.backendVn.SWP.services.PDFGeneratorService;
import com.lowagie.text.DocumentException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;


@Controller
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PDFExportController {
    PDFGeneratorService pdfGeneratorService;

    @GetMapping("/pdf/generate/{orderID}")
    public void generatePDF(HttpServletResponse response, @PathVariable Integer orderID ) throws IOException, DocumentException {
        response.setContentType("application/pdf");
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        String currentDate = dateFormat.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=Warranty till "+ currentDate +".pdf";
        response.setHeader(headerKey, headerValue);

        this.pdfGeneratorService.export(response, orderID);
    }
}




