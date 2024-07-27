//package com.backendVn.SWP.services;
//import com.backendVn.SWP.entities.RequestOrder;
//import com.backendVn.SWP.entities.WarrantyCard;
//import com.backendVn.SWP.exception.AppException;
//import com.backendVn.SWP.exception.ErrorCode;
//import com.backendVn.SWP.repositories.RequestOrderRepository;
//import com.backendVn.SWP.repositories.WarrantyCardRepository;
//import com.lowagie.text.*;
//import com.lowagie.text.Font;
//import com.lowagie.text.Image;
//import com.lowagie.text.Rectangle;
//import com.lowagie.text.pdf.*;
//import com.lowagie.text.Element;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import lombok.experimental.FieldDefaults;
//import org.springframework.format.annotation.DateTimeFormat;
//import org.springframework.stereotype.Service;
//
//import java.awt.*;
//
//import java.io.IOException;
//import java.text.DateFormat;
//import java.time.ZoneId;
//import java.time.format.DateTimeFormatter;
//
//@Service
//@RequiredArgsConstructor
//@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
//public class PDFGeneratorService {
//
//    RequestOrderRepository requestOrderRepository ;
//    WarrantyCardRepository warrantyCardRepository ;
//
//    public void export(HttpServletResponse response, Integer orderID) throws IOException, DocumentException {
//        RequestOrder requestOrder = requestOrderRepository.findById(orderID).orElseThrow(() -> new AppException(ErrorCode.REQUEST_ORDER_NOT_FOUND));
//        WarrantyCard warrantyCard = warrantyCardRepository.findById(orderID).orElseThrow(() -> new AppException(ErrorCode.WARRANTY_CARD_NOT_FOUND));
//
//
//        Document document = new Document(PageSize.A4.rotate());
//        PdfWriter pdfWriter = PdfWriter.getInstance(document, response.getOutputStream());
//        document.open();
//
//        PdfContentByte canvas = pdfWriter.getDirectContentUnder();
//        Rectangle background = new Rectangle(PageSize.A4.rotate());
//        background.setBackgroundColor(Color.black);
//        canvas.rectangle(background.getLeft(), background.getBottom(), background.getWidth(), background.getHeight());
//        canvas.fill();
//
//        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA, 35, Font.BOLD, Color.YELLOW);
//        Paragraph title = new Paragraph("WARRANTY CARD", fontTitle);
//        title.setAlignment(Paragraph.ALIGN_CENTER);
//        document.add(title);
//
//        document.add(new Paragraph("\n\n"));
//
//        PdfPTable table = new PdfPTable(2);
//        table.setWidthPercentage(100);
//        table.setSpacingBefore(10f);
//
//
//        PdfPCell leftCell = new PdfPCell();
//        leftCell.setBorder(Rectangle.NO_BORDER);
//
//
////        String imagePath = "";
////        Image image = Image.getInstance(imagePath);
//
////        image.scaleToFit(250, 250);
////        image.setAlignment(Image.ALIGN_LEFT);
////        leftCell.addElement(image);
//
//        table.addCell(leftCell);
//
//
//        PdfPCell rightCell = new PdfPCell();
//        rightCell.setBorder(Rectangle.NO_BORDER);
//
//        Font fontTitle1 = FontFactory.getFont(FontFactory.TIMES, 35, Font.BOLD, Color.WHITE);
//        Paragraph title1 = new Paragraph("Luxe Store", fontTitle1);
//        Paragraph title2 = new Paragraph("Jewelry Production", fontTitle1);
//        title1.setAlignment(Paragraph.ALIGN_CENTER);
//        title2.setAlignment(Paragraph.ALIGN_CENTER);
//        rightCell.addElement(title1);
//        rightCell.addElement(title2);
//
//        table.addCell(rightCell);
//        document.add(table);
//        document.add(new Paragraph("\n\n"));
//
//        PdfPTable table1 = new PdfPTable(2);
//        table1.setWidthPercentage(100);
//        table1.setSpacingBefore(10f);
//
//        Font fontParagraph = FontFactory.getFont(FontFactory.HELVETICA, 20,Color.WHITE);
//        PdfPCell leftCell1 = new PdfPCell();
//        leftCell1.setBorder(Rectangle.NO_BORDER);
//
//        if (requestOrder.getRequestID().getCompanyDesign()!=null) {
//            Paragraph productName = new Paragraph("Product name: " + requestOrder.getRequestID().getCompanyDesign().getDesignName(), fontParagraph);
//            leftCell1.addElement(productName);
//        }else{
//            Paragraph productName = new Paragraph("Product name: " + requestOrder.getDesignID().getDesignName(), fontParagraph);
//            leftCell1.addElement(productName);
//        }
//
//        leftCell1.addElement(new Paragraph("Product type: " +requestOrder.getRequestID().getCategory(), fontParagraph));
//        leftCell1.addElement(new Paragraph("Material: " +requestOrder.getRequestID().getMaterialID().getMaterialName(), fontParagraph));
//
//        table1.addCell(leftCell1);
//
//        PdfPCell rightCell1 = new PdfPCell();
//        rightCell1.setBorder(Rectangle.NO_BORDER);
//
//        if (requestOrder.getRequestID().getMainStone() != null){
//            Paragraph mainStone = new Paragraph("Main Stone: "+requestOrder.getRequestID().getMainStone().getMaterialName() , fontParagraph);
//            rightCell1.addElement(mainStone);
//        }
//
//        if(requestOrder.getRequestID().getSubStone() != null){
//            Paragraph subStone = new Paragraph("Sub Stone: "+requestOrder.getRequestID().getSubStone().getMaterialName() , fontParagraph);
//            rightCell1.addElement(subStone);
//        }
//
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy")
//                .withZone(ZoneId.systemDefault());
//
//        rightCell1.addElement(new Paragraph("Duration from: " +formatter.format(warrantyCard.getCreatedAt())+ " - " +formatter.format(warrantyCard.getEndAt()) , fontParagraph));
//
//        table1.addCell(rightCell1);
//        document.add(table1);
//
//        document.close();
//
//    }
//}

package com.backendVn.SWP.services;

import com.backendVn.SWP.entities.RequestOrder;
import com.backendVn.SWP.entities.WarrantyCard;
import com.backendVn.SWP.exception.AppException;
import com.backendVn.SWP.exception.ErrorCode;
import com.backendVn.SWP.repositories.RequestOrderRepository;
import com.backendVn.SWP.repositories.WarrantyCardRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.interactive.form.PDAcroForm;
import org.apache.pdfbox.pdmodel.interactive.form.PDField;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletResponse;

import java.io.File;
import java.io.IOException;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class PDFGeneratorService {

    RequestOrderRepository requestOrderRepository;
    WarrantyCardRepository warrantyCardRepository;

    public void export(HttpServletResponse response, Integer orderID) throws IOException {
        RequestOrder requestOrder = requestOrderRepository.findById(orderID).orElseThrow(() -> new AppException(ErrorCode.REQUEST_ORDER_NOT_FOUND));
        WarrantyCard warrantyCard = warrantyCardRepository.findById(orderID).orElseThrow(() -> new AppException(ErrorCode.WARRANTY_CARD_NOT_FOUND));

        // Load the PDF template
        File file = new File("path/to/your/template.pdf"); // Path to your PDF form
        try (PDDocument document = PDDocument.load(file)) {
            PDAcroForm acroForm = document.getDocumentCatalog().getAcroForm();

            if (acroForm != null) {
                // Fill in the form fields
                fillField(acroForm, "productName", getProductName(requestOrder));
                fillField(acroForm, "productType", requestOrder.getRequestID().getCategory());
                fillField(acroForm, "material", requestOrder.getRequestID().getMaterialID().getMaterialName());
                fillField(acroForm, "mainStone", requestOrder.getRequestID().getMainStone() != null ? requestOrder.getRequestID().getMainStone().getMaterialName() : "");
                fillField(acroForm, "subStone", requestOrder.getRequestID().getSubStone() != null ? requestOrder.getRequestID().getSubStone().getMaterialName() : "");
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy").withZone(ZoneId.systemDefault());
                fillField(acroForm, "duration", formatter.format(warrantyCard.getCreatedAt()) + " - " + formatter.format(warrantyCard.getEndAt()));

                // Set the response content type
                response.setContentType("application/pdf");
                response.setHeader("Content-Disposition", "attachment; filename=warranty_card.pdf");

                // Save the filled PDF to the response output stream
                document.save(response.getOutputStream());
            }
        }
    }

    private void fillField(PDAcroForm acroForm, String fieldName, String value) throws IOException {
        PDField field = acroForm.getField(fieldName);
        if (field != null) {
            field.setValue(value);
        }
    }

    private String getProductName(RequestOrder requestOrder) {
        if (requestOrder.getRequestID().getCompanyDesign() != null) {
            return requestOrder.getRequestID().getCompanyDesign().getDesignName();
        } else {
            return requestOrder.getDesignID().getDesignName();
        }
    }
}
