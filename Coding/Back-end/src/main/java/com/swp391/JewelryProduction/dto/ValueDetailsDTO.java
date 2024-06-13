package com.swp391.JewelryProduction.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ValueDetailsDTO {
    private Integer styleID;
    private String parameterName;
    private String parameterValue;
}
