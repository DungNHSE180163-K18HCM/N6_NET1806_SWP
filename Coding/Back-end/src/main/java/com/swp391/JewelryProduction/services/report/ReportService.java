package com.swp391.JewelryProduction.services.report;

import com.swp391.JewelryProduction.dto.ReportDTO;
import com.swp391.JewelryProduction.dto.RequestDTOs.ReportRequest;
import com.swp391.JewelryProduction.pojos.Order;
import com.swp391.JewelryProduction.pojos.Report;

import java.util.List;

public interface ReportService {
    void saveReport(Report report);
    Report saveReport(ReportRequest reportRequest, Order order);
}
