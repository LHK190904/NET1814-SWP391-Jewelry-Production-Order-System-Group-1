package com.backendVn.SWP.controllers;


import com.backendVn.SWP.services.PDFGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileNotFoundException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class PDFExportController {

    private static final Logger logger = LoggerFactory.getLogger(PDFExportController.class);

    @Autowired
    private PDFGeneratorService pdfGeneratorService;

    @GetMapping("/generate-certificate/{requestId}")
    public ResponseEntity<byte[]>generateCertificate(@PathVariable Integer requestId) {
        String templatePath = "SWP/src/media/PDFForm (2).pdf"; // Absolute path to the template
        String outputPath = "GeneratedWarrantyCertificate.pdf";

        try {
            // Prepare data for placeholders
            List<String> data = new ArrayList<>();
            data.add("Customer Name ________________");
            data.add("Product Name __________________");
            data.add("Product Type____________");
            data.add("Material _____________");
            data.add("Main Stone ________________");
            data.add("Sub Stone _________________");
            data.add("Warranty Start Date ______");
            data.add("Warranty End Date ______");

            // Generate the PDF
            pdfGeneratorService.generateWarrantyCertificate(data, templatePath, outputPath, requestId);

            // Read the generated PDF file
            File file = new File(outputPath);
            byte[] contents = Files.readAllBytes(file.toPath());

            // Return the PDF as a downloadable file
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName())
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(contents);
        } catch (FileNotFoundException e) {
            logger.error("Template file not found: " + templatePath, e);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Template file not found: " + templatePath, e);
        } catch (Exception e) {
            logger.error("Error generating PDF", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error generating PDF", e);
        }
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> handleResponseStatusException(ResponseStatusException e) {
        return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
    }
}
