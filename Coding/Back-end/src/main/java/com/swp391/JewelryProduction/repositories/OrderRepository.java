package com.swp391.JewelryProduction.repositories;

import com.swp391.JewelryProduction.pojos.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, String> {
}
