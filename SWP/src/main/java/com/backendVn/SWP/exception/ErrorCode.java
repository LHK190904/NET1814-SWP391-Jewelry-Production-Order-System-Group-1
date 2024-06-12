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
    REQUEST_ORDER_NOT_FOUND(1011, "Request Order not found", HttpStatus.NOT_FOUND)
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
