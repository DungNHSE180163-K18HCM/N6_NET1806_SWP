package com.swp391.JewelryProduction.pojos.designPojos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "product_specification")
public class ProductSpecification {
    @Id
    @GeneratedValue
    private Integer id;

    @OneToOne(mappedBy = "specification", fetch = FetchType.LAZY)
    private Product product;

    @MapKeyJoinColumn(name = "product_parameter_id")
    @OneToMany(mappedBy = "productSpecification", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ParameterValue> parameterValues;
}
