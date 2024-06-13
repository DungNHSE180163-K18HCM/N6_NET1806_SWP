package com.swp391.JewelryProduction.dto;

import com.swp391.JewelryProduction.pojos.designPojos.ParameterValue;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class ProductSpecificationDTO {
    private UUID id;
    private List<ParameterValue> parameterValues;
}
