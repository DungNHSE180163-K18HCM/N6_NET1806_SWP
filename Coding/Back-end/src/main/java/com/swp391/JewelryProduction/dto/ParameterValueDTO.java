package com.swp391.JewelryProduction.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ParameterValueDTO {
    private Integer id;
    private Integer parameterID;
    private String value;
    private String description;
    private Integer parentValueID;
}
