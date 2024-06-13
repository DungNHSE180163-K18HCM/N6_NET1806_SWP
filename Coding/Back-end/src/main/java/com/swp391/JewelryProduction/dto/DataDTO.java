package com.swp391.JewelryProduction.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class DataDTO {
    private boolean isSuccess;
    private int status;
    private String message;
}
