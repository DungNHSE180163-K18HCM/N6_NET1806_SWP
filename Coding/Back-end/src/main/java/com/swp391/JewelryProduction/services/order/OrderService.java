package com.swp391.JewelryProduction.services.order;

import com.swp391.JewelryProduction.dto.OrderDTO;
import com.swp391.JewelryProduction.pojos.Order;

import java.util.List;

public interface OrderService {
    List<Order> findAllOrders();
    Order findOrderById(String id);
    Order saveOrder(Order order);
    Order createNewOrder();
}
