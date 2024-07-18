package com.backendVn.SWP.services;
import com.backendVn.SWP.entities.RequestOrder;
import com.backendVn.SWP.entities.WarrantyCard;
import com.backendVn.SWP.exception.AppException;
import com.backendVn.SWP.exception.ErrorCode;
import com.backendVn.SWP.repositories.RequestOrderRepository;
import com.backendVn.SWP.repositories.WarrantyCardRepository;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfCell;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.lowagie.text.Element;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.awt.*;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class PDFGeneratorService {

    RequestOrderRepository requestOrderRepository ;
    WarrantyCardRepository warrantyCardRepository ;
    public void export(HttpServletResponse response, Integer orderID ) throws IOException, DocumentException {
        RequestOrder requestOrder = requestOrderRepository.findById(orderID).orElseThrow(() -> new AppException(ErrorCode.REQUEST_ORDER_NOT_FOUND));
        WarrantyCard warrantyCard = warrantyCardRepository.findById(orderID).orElseThrow(() -> new AppException(ErrorCode.WARRANTY_CARD_NOT_FOUND));

        Document document = new Document(PageSize.A4.rotate());
        PdfWriter.getInstance(document, response.getOutputStream());
        document.open();

        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA, 35, Font.BOLD, Color.DARK_GRAY);
        Paragraph title = new Paragraph("WARRANTY CARD", fontTitle);
        title.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(title);

        String imagePath = "C:\\Users\\Dell\\NET1814-SWP391-Jewelry-Production-Order-System-Group-1\\src\\assets\\images\\logo.png"; // Replace with your image path
        Image image = Image.getInstance(imagePath);

        // Adjust the image size if needed
        image.scaleToFit(200, 200); // Adjust width and height as needed
        image.setAlignment(Image.ALIGN_CENTER);
        document.add(image);



        Font fontTitle1 = FontFactory.getFont(FontFactory.HELVETICA, 20);
        Paragraph title1 = new Paragraph("Luxe Store", fontTitle1);
        Paragraph title2 = new Paragraph("Jewelry Production", fontTitle1);
        title1.setAlignment(Paragraph.ALIGN_CENTER);
        title2.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(title1);
        document.add(title2);


        Font fontParagraph = FontFactory.getFont(FontFactory.HELVETICA, 15);
        Paragraph name = new Paragraph("Customer name: " , fontParagraph);
        name.setAlignment(Paragraph.ALIGN_LEFT);
        document.add(name);


        Paragraph productType = new Paragraph("Product type: " +requestOrder.getRequestID().getCategory(), fontParagraph);
        Paragraph material = new Paragraph("Material: " +requestOrder.getRequestID().getMaterialID().getMaterialName(), fontParagraph);
        Paragraph duration = new Paragraph("Duration from: " +warrantyCard.getCreatedAt()+ "->" +warrantyCard.getEndAt() , fontParagraph);

        productType.setAlignment(Paragraph.ALIGN_LEFT);
        material.setAlignment(Paragraph.ALIGN_LEFT);
        duration.setAlignment(Paragraph.ALIGN_LEFT);
        document.add(productType);
        document.add(material);
        document.add(duration);

        if (requestOrder.getRequestID().getCompanyDesign()!=null){
            Paragraph productName = new Paragraph("Product name: " +requestOrder.getRequestID().getCompanyDesign().getDesignName() , fontParagraph);
            productName.setAlignment(Paragraph.ALIGN_LEFT);
            document.add(productName);
        }else{
            Paragraph productName = new Paragraph("Product name: Customer's design"  , fontParagraph);
            productName.setAlignment(Paragraph.ALIGN_LEFT);
            document.add(productName);
        }

        if (requestOrder.getRequestID().getMainStone() != null){
            Paragraph mainStone = new Paragraph("Main Stone: "+requestOrder.getRequestID().getMainStone().getMaterialName() , fontParagraph);
            mainStone.setAlignment(Paragraph.ALIGN_RIGHT);
            document.add(mainStone);}

        if(requestOrder.getRequestID().getSubStone() != null){
            Paragraph subStone = new Paragraph("Sub Stone: "+requestOrder.getRequestID().getSubStone().getMaterialName() , fontParagraph);
            subStone.setAlignment(Paragraph.ALIGN_RIGHT);
            document.add(subStone);
        }







        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);

        Font fontFooter = FontFactory.getFont(FontFactory.HELVETICA, 12);
        Paragraph addressParagraph = new Paragraph("xxxxxxxxxxxxx", fontFooter);
        Paragraph contactNumberParagraph = new Paragraph("xxxxxxxxxxxxxx", fontFooter);

        // Align paragraphs
        addressParagraph.setAlignment(Element.ALIGN_LEFT);
        contactNumberParagraph.setAlignment(Element.ALIGN_RIGHT);

        PdfPCell addressCell = new PdfPCell(addressParagraph);
        PdfPCell contactNumberCell = new PdfPCell(contactNumberParagraph);

        // Remove borders from cells
        addressCell.setBorder(Rectangle.NO_BORDER);
        contactNumberCell.setBorder(Rectangle.NO_BORDER);

        // Add cells to the table
        table.addCell(addressCell);
        table.addCell(contactNumberCell);


        // Add the table to the document
        document.add(table);


        document.close();

    }
}
