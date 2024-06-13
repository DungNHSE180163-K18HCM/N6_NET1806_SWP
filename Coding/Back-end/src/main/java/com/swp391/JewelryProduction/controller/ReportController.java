package com.swp391.JewelryProduction.controller;

import com.swp391.JewelryProduction.dto.RequestDTOs.ReportRequest;
import com.swp391.JewelryProduction.enums.OrderStatus;
import com.swp391.JewelryProduction.enums.ReportType;
import com.swp391.JewelryProduction.enums.Role;
import com.swp391.JewelryProduction.pojos.Notification;
import com.swp391.JewelryProduction.pojos.Order;
import com.swp391.JewelryProduction.pojos.Report;
import com.swp391.JewelryProduction.services.account.AccountService;
import com.swp391.JewelryProduction.services.notification.NotificationService;
import com.swp391.JewelryProduction.services.order.OrderService;
import com.swp391.JewelryProduction.services.report.ReportService;
import com.swp391.JewelryProduction.util.Response;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/report")
public class ReportController {
    private final OrderService orderService;
    private NotificationService notificationService;
    private ReportService reportService;
    private AccountService accountService;

    @PostMapping("/request")
    public ResponseEntity<Response> postCustomerRequest(@Valid @RequestBody ReportRequest request) {
        Order order = orderService.createNewOrder();
        Report requestReport = reportService.saveReport(request, order);

        order.setStatus(OrderStatus.REQUEST);
        Notification notification = new Notification(UUID.randomUUID(), report, order, accountService.findAccountByRole(Role.MANAGER));
        reportService.saveReport(request, order);
        orderService.saveOrder(order);
        notificationService.saveNotification(notification);
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Request send successfully.")
                .response("request", report)
                .buildEntity();
    }

    @PostMapping("/quotation")
    public ResponseEntity<Response> postStaffQuotation(@Valid @RequestBody Report report) {
        report.setType(ReportType.QUOTATION);
        reportService.saveReport(report);
        orderService.findAllOrders().stream().filter(ord -> {
            return ord.getId().equals(report.getReportingOrder().getId());
        }).findFirst().get().getRelatedReports().add(report);
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Quotation send successfully.")
                .response("quotation", report)
                .buildEntity();
    }

    @PostMapping("/order")
    public ResponseEntity<Response> postCustomerOrder(@Valid @RequestBody Report report) {
        report.setType(ReportType.ORDER);
        reportService.saveReport(report);
        orderService.findAllOrders().stream().filter(ord -> {
            return ord.getId().equals(report.getReportingOrder().getId());
        }).findFirst().get().getRelatedReports().add(report);
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Quotation send successfully.")
                .response("quotation", report)
                .buildEntity();
    }


}
