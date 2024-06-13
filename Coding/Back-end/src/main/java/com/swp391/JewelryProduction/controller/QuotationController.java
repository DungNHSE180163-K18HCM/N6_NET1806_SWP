package com.swp391.JewelryProduction.controller;

import com.swp391.JewelryProduction.pojos.Quotation;
import com.swp391.JewelryProduction.services.order.OrderService;
import com.swp391.JewelryProduction.services.quotation.QuotationService;
import com.swp391.JewelryProduction.util.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/{orderId}/quotation")
@RequiredArgsConstructor
public class QuotationController {
    private final QuotationService quotationService;
    private final OrderService orderService;

    @GetMapping("/get-quote")
    public ResponseEntity<Response> getQuotation(@PathVariable String orderId) {
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Request send successfully.")
                .response("quotation", quotationService.findQuotationByOrderId(orderId))
                .buildEntity();
    }

    @PostMapping("/submit")
    public ResponseEntity<Response> createQuotation(@PathVariable String orderId, @RequestBody Quotation quotation) {
        orderService.findOrderById(orderId).setQuotation(quotation);
        orderService.saveOrder(orderService.findOrderById(orderId));
        quotationService.saveQuotation(quotation);
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Request send successfully.")
                .response("quotation", quotationService.findQuotationByOrderId(orderId))
                .buildEntity();
    }

    @PostMapping("/delete")
    public ResponseEntity<Response> submitQuotation(@PathVariable String orderId, @RequestBody Quotation quotation) {
        orderService.findOrderById(orderId).setQuotation(null);
        orderService.saveOrder(orderService.findOrderById(orderId));
        quotationService.deleteQuotation(quotation);
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Request send successfully.")
                .response("quotation", quotationService.findQuotationByOrderId(orderId))
                .buildEntity();
    }
}
