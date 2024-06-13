package com.swp391.JewelryProduction.services.quotation;

import com.swp391.JewelryProduction.pojos.Quotation;
import com.swp391.JewelryProduction.repositories.QuotationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuotationServiceImpl implements QuotationService {
    private final QuotationRepository quotationRepository;


    @Override
    public Quotation findQuotationByOrderId(String orderId) {
        if(quotationRepository.findQuotationByOrderId(orderId).isPresent()) {
            return quotationRepository.findQuotationByOrderId(orderId).get();
        } else return null;
    }

    @Override
    public void saveQuotation(Quotation quotation) {
        quotationRepository.save(quotation);
    }

    @Override
    public void deleteQuotation(Quotation quotation) {
        quotationRepository.delete(quotation);
    }

    @Override
    public List<Quotation> findAllQuotations() {
        return quotationRepository.findAll().stream().toList();
    }
}
