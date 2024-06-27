package com.backendVn.SWP.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Nationalized;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Design {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DesignID", nullable = false)
    private Integer id;

    @Size(max = 100)
    @Nationalized
    @Column(name = "design_name", length = 100)
    private String designName;

    @Nationalized
    @Lob
    @Column(name = "Description")
    private String description;

    @Nationalized
    @Lob
    @Column(name = "URLImage")
    private String uRLImage;

    @Size(max = 50)
    @Nationalized
    @Column(name = "Category", length = 50)
    private String category;

}