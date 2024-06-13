package com.swp391.JewelryProduction.pojos.designPojos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Parameter_Value")
public class ParameterValue {
    @Id
    @GeneratedValue
    private Integer id;
    @Column(length = 255)
    private String value;
    @Column(columnDefinition = "text")
    private String description;

    @ManyToOne
    @JoinColumn(name = "parameter_id")
    private ProductParameters parameter;

    @ManyToMany
    @JoinTable(
            name = "parent_child_value",
            joinColumns = { @JoinColumn(name = "parent_id") },
            inverseJoinColumns = { @JoinColumn(name = "child_id")}
    )
    private List<ParameterValue> parentValues;

    @ManyToMany(mappedBy = "parentValues")
    private List<ParameterValue> childrenValues;

    @ManyToMany(mappedBy = "productValues")
    private List<Product> products;
}
