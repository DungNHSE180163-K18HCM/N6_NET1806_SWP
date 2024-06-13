package com.swp391.JewelryProduction.dto.RequestDTOs;

import com.swp391.JewelryProduction.enums.ReportType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReportRequest {
    private String title;
    private String description;
    private ReportType type;
    private String senderEmail;
    private String receiverEmail;
}
