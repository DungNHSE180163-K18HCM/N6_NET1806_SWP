package com.swp391.JewelryProduction.services.quotationItem;

import com.swp391.JewelryProduction.pojos.QuotationItem;

import java.util.List;

public interface QuotationItemService {
    void saveQuotationItem(QuotationItem quotationItem);
    void deleteQuotationItem(QuotationItem quotationItem);
    QuotationItem getQuotationItemByQuotationId(String id);
    List<QuotationItem> getAllQuotationItems();
}
