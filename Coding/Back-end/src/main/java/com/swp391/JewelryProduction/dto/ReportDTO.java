package com.swp391.JewelryProduction.dto;

import com.swp391.JewelryProduction.enums.ReportType;
import com.swp391.JewelryProduction.pojos.Account;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ReportDTO {
    private Integer id;
    private String title;
    private String description;
    private LocalDateTime createdDate;
    private ReportType type;
    private Account sender;
    private Account receiver;
}
