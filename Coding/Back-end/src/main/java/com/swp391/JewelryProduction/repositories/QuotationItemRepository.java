package com.swp391.JewelryProduction.repositories;

import com.swp391.JewelryProduction.pojos.QuotationItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuotationItemRepository extends JpaRepository<QuotationItem, Integer> {
    Optional<QuotationItem> findByQuotationId(String quotation_id);
}
