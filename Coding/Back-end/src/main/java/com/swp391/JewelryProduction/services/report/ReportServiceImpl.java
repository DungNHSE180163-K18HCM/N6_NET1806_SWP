package com.swp391.JewelryProduction.services.report;

import com.swp391.JewelryProduction.dto.RequestDTOs.ReportRequest;
import com.swp391.JewelryProduction.pojos.Account;
import com.swp391.JewelryProduction.pojos.Order;
import com.swp391.JewelryProduction.pojos.Report;
import com.swp391.JewelryProduction.repositories.AccountRepository;
import com.swp391.JewelryProduction.repositories.ReportRepository;
import com.swp391.JewelryProduction.util.exceptions.ObjectNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
    private ReportRepository reportRepository;
    private AccountRepository accountRepository;

    public void saveReport(Report report) {
        reportRepository.save(report);
    }

    @Override
    public Report saveReport(ReportRequest request, Order order) {
        Account sender = accountRepository
                .findByEmail(request.getSenderEmail())
                .orElseThrow(() -> new ObjectNotFoundException("Sender with " + request.getSenderEmail() + " not found"));
        Account receiver = accountRepository
                .findByEmail(request.getReceiverEmail())
                .orElseThrow(() -> new ObjectNotFoundException("Receiver with " + request.getSenderEmail() + " not found"));

        Report report = Report.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .createdDate(LocalDateTime.now())
                .sender(sender)
                .receiver(receiver)
                .build();
        return report;
    }
}
