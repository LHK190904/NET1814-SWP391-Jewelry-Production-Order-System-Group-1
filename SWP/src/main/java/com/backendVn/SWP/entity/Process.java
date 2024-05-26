package com.backendVn.SWP.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.io.Serializable;
import java.util.Date;

@Entity
//@IdClass(ProcessId.class)
public class Process {
    @Id
    private Integer processId;

    @Id
//    @ManyToOne
//    @JoinColumn(name = "requestId")
    private Request request;

    private Date updatedAt;

//    @ManyToOne
//    @JoinColumn(name = "updatedBy")
    private User updatedBy;

    private String status;

    public Integer getProcessId() {
        return processId;
    }

    public void setProcessId(Integer processId) {
        this.processId = processId;
    }

    public Request getRequest() {
        return request;
    }

    public void setRequest(Request request) {
        this.request = request;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(User updatedBy) {
        this.updatedBy = updatedBy;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    // Getters and Setters
}


//public class ProcessId implements Serializable {
//    private Integer processId;
//    private Integer requestId;
//
//    // Getters, Setters, equals, hashCode
//}

