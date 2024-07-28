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

import com.backendVn.SWP.entities.Request;
import com.backendVn.SWP.entities.RequestOrder;
import com.backendVn.SWP.entities.WarrantyCard;
import com.backendVn.SWP.exception.AppException;
import com.backendVn.SWP.exception.ErrorCode;
import com.backendVn.SWP.repositories.RequestOrderRepository;
import com.backendVn.SWP.repositories.RequestRepository;
import com.backendVn.SWP.repositories.WarrantyCardRepository;
import com.itextpdf.layout.Document;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.TextAlignment;
import org.springframework.stereotype.Service;


import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Service
public class PDFGeneratorService {

    private final RequestRepository requestRepository;
    private final RequestOrderRepository requestOrderRepository;
    private final WarrantyCardRepository warrantyCardRepository;

    public PDFGeneratorService(RequestRepository requestRepository, RequestOrderRepository requestOrderRepository,
                               WarrantyCardRepository warrantyCardRepository) {
        this.requestRepository = requestRepository;
        this.requestOrderRepository = requestOrderRepository;
        this.warrantyCardRepository = warrantyCardRepository;
    }

    public void generateWarrantyCertificate(List<String> data, String templatePath, String outputPath, Integer requestId) throws Exception {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_NOT_FOUND));
        RequestOrder requestOrder = requestOrderRepository.findByRequestID(request)
                .orElseThrow(()-> new AppException(ErrorCode.REQUEST_ORDER_NOT_FOUND));
        WarrantyCard warrantyCard = warrantyCardRepository.findByRequestOrder(requestOrder)
                .orElseThrow(()-> new AppException(ErrorCode.WARRANTY_CARD_NOT_FOUND));

        // Load the PDF template
        InputStream templateStream = new FileInputStream(templatePath);

        try {
            PdfDocument pdfDoc = new PdfDocument(new PdfReader(templateStream), new PdfWriter(outputPath));
            Document document = new Document(pdfDoc);

            PdfCanvas canvas = new PdfCanvas(pdfDoc.getFirstPage());

            addTextAtPosition(document, request.getCustomerID().getCusName(), 430, 435);
            addTextAtPosition(document, requestOrder.getDesignID().getDesignName(), 415, 410);
            addTextAtPosition(document, request.getCategory(), 410, 387);
            addTextAtPosition(document, request.getMaterialID().getMaterialName(), 565, 387);
            if (request.getMainStone()!=null) {
                addTextAtPosition(document, request.getMainStone().getMaterialName(), 400, 365);
            }
            if(request.getSubStone()!=null){
                addTextAtPosition(document, request.getSubStone().getMaterialName(), 390, 343);
            }
            String formattedStartDate = formatInstantToString(String.valueOf(warrantyCard.getCreatedAt()));
            String formattedEndDate = formatInstantToString(String.valueOf(warrantyCard.getEndAt()));
             addTextAtPosition(document, formattedStartDate, 452, 320);
            addTextAtPosition(document, formattedEndDate, 683, 320);

            pdfDoc.close();
            System.out.println("PDF filled successfully.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private String formatInstantToString(String instantString) {
        Instant instant = Instant.parse(instantString);
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return localDateTime.format(formatter);
    }

    private static void addTextAtPosition(Document document, String text, float x, float y) {
        Paragraph paragraph = new Paragraph(text)
                .setFontSize(12)
                .setTextAlignment(TextAlignment.LEFT);

        document.showTextAligned(paragraph, x, y, TextAlignment.LEFT);
    }
}

