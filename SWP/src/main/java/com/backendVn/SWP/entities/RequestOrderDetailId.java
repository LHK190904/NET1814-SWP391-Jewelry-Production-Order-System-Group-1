package com.backendVn.SWP.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.Hibernate;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Embeddable
public class RequestOrderDetailId implements Serializable {
    @Serial
    private static final long serialVersionUID = 8056738067555543619L;
    @NotNull
    @Column(name = "MaterialID", nullable = false)
    private Integer materialID;

    @NotNull
    @Column(name = "request_orderid", nullable = false)
    private Integer requestOrderid;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        RequestOrderDetailId entity = (RequestOrderDetailId) o;
        return Objects.equals(this.requestOrderid, entity.requestOrderid) &&
                Objects.equals(this.materialID, entity.materialID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(requestOrderid, materialID);
    }

}