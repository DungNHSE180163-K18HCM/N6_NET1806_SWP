package com.swp391.JewelryProduction.services.product;

import com.swp391.JewelryProduction.pojos.designPojos.Product;
import com.swp391.JewelryProduction.pojos.designPojos.ProductSpecification;


import java.util.List;

public interface ProductService {
    List<Product> findAll();
    ProductSpecification findProductSpecificationByProductId(String id);
    void saveProduct(Product product);
    void deleteProduct(String id);
}
