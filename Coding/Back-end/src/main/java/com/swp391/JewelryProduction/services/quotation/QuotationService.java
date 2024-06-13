package com.swp391.JewelryProduction.services.quotation;

import com.swp391.JewelryProduction.dto.FinalQuotationDTO;
import com.swp391.JewelryProduction.pojos.Quotation;

import java.util.List;
import java.util.Optional;

public interface QuotationService {
    Quotation findQuotationByOrderId(String orderId);
    void saveQuotation(Quotation quotation);
    void deleteQuotation(Quotation quotation);
    List<Quotation> findAllQuotations();
}
