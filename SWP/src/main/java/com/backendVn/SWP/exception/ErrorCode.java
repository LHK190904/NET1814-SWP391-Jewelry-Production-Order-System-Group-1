package com.backendVn.SWP.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Invalid key", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    INVALID_USERNAME(1003, "Username must be at least 3 characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least 8 characters", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated user", HttpStatus.UNAUTHORIZED),
    INTERNAL_SERVER_ERROR(1007, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR),
    REQUEST_NOT_FOUND(1008, "Request not found", HttpStatus.NOT_FOUND),
    DESCRIPTION_EMPTY(1009, "Description cannot be empty", HttpStatus.BAD_REQUEST),
    QUOTATION_NOT_FOUND(1010, "Quotation not found", HttpStatus.NOT_FOUND),
    REQUEST_ORDER_NOT_FOUND(1011, "Request Order not found", HttpStatus.NOT_FOUND),
    DESIGN_NOT_FOUND(1012, "Request Order not found", HttpStatus.NOT_FOUND),
    WARRANTY_CARD_NOT_FOUND(1013, "Warranty card not found", HttpStatus.NOT_FOUND),
    INVOICE_NOT_FOUND(1014, "Invoice card not found", HttpStatus.NOT_FOUND),
    MATERIAL_NOT_FOUND(1015, "Invoice card not found", HttpStatus.NOT_FOUND),
    INVOICE_DETAIL_NOT_FOUND(1016, "Invoice card not found", HttpStatus.NOT_FOUND),
    REQUEST_STATUS_NOT_ALLOWED(1017, "Request status not allowed for update", HttpStatus.FORBIDDEN),
    END_DATE_INVALID(1018, "End date must be in the future", HttpStatus.BAD_REQUEST),
    INVALID_EMAIL(1019, "Invalid email format", HttpStatus.BAD_REQUEST),
    INVALID_TITLE(1020, "Invalid title", HttpStatus.BAD_REQUEST),
    END_DATE_REQUIRED(1021, "End date is required", HttpStatus.BAD_REQUEST),
    DESIGN_NAME_EMPTY(1022, "Design name cannot be empty", HttpStatus.BAD_REQUEST),
    DESIGN_NAME_TOO_LONG(1023, "Design name cannot exceed 100 characters", HttpStatus.BAD_REQUEST),
    DESCRIPTION_TOO_LONG(1024, "Description cannot exceed 255 characters", HttpStatus.BAD_REQUEST),
    URL_IMAGE_TOO_LONG(1025, "URL image cannot exceed 255 characters", HttpStatus.BAD_REQUEST),
    TOKEN_EMPTY(1026, "Token cannot be empty", HttpStatus.BAD_REQUEST),
    REQUEST_ORDER_DETAIL_NOT_FOUND(1027, "Request Order detail not found", HttpStatus.NOT_FOUND),
    PROCESS_NOT_FOUND(1028, "Process not found", HttpStatus.NOT_FOUND),
    INVALID_SALE_COST(1029, "Sale cost must be greater than capital cost", HttpStatus.BAD_REQUEST),
    ;
    private int code;
    private String message;
    private HttpStatusCode httpStatusCode;

    ErrorCode(int code, String message, HttpStatusCode httpStatusCode) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }

}
