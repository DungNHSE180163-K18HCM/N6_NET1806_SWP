package com.swp391.JewelryProduction.dto;

import com.swp391.JewelryProduction.pojos.Quotation;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuotationItemDTO {
    private Integer id;
    private String name;
    private int quantity;
    private double unitPrice;
    private double totalPrice;
    private Quotation quotation;
}
