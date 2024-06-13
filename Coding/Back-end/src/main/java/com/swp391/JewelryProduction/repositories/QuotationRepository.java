package com.swp391.JewelryProduction.repositories;

import com.swp391.JewelryProduction.pojos.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuotationRepository extends JpaRepository<Quotation, String> {
    Optional<Quotation> findQuotationByOrderId(String orderId);
}
