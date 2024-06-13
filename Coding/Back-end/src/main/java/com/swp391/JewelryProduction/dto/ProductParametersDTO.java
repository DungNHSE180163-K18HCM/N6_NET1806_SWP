package com.swp391.JewelryProduction.dto;

import com.swp391.JewelryProduction.pojos.designPojos.ParameterValue;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProductParametersDTO {
    private Integer id;
    private String name;
    private List<ParameterValue> parameters;
}
