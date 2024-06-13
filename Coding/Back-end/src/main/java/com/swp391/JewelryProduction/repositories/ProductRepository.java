package com.swp391.JewelryProduction.repositories;

import com.swp391.JewelryProduction.pojos.designPojos.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, String> {
}
