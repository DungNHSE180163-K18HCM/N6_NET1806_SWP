package com.swp391.JewelryProduction.pojos.designPojos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "specification_value")
@Entity
public class SpecificationValues {
    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_specification_id", nullable = false)
    private ProductSpecification productSpecification;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_parameter_id", nullable = false)
    private ProductParameters productParameter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parameter_value_id", nullable = false)
    private ParameterValue parameterValue;
}
