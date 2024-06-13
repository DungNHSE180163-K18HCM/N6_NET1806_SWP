package com.swp391.JewelryProduction.services.quotationItem;

import com.swp391.JewelryProduction.dto.QuotationItemDTO;
import com.swp391.JewelryProduction.pojos.QuotationItem;
import com.swp391.JewelryProduction.repositories.QuotationItemRepository;
import com.swp391.JewelryProduction.repositories.QuotationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuotationItemServiceImpl implements QuotationItemService {
    private final QuotationRepository quotationRepository;
    private QuotationItemRepository quotationItemRepository;

    @Override
    public void saveQuotationItem(QuotationItem quotationItem) {
        quotationItemRepository.save(quotationItem);
    }

    @Override
    public void deleteQuotationItem(QuotationItem quotationItem) {
        quotationItemRepository.delete(quotationItem);
    }

    @Override
    public QuotationItem getQuotationItemByQuotationId(String id) {
        if(quotationItemRepository.findByQuotationId(id).isPresent()) {
            return quotationItemRepository.findByQuotationId(id).get();
        } else return null;
    }

    @Override
    public List<QuotationItem> getAllQuotationItems() {
        return quotationItemRepository.findAll().stream().toList();
    }
}
