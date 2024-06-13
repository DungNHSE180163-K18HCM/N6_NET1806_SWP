package com.swp391.JewelryProduction.services.product;

import com.swp391.JewelryProduction.pojos.designPojos.Product;
import com.swp391.JewelryProduction.pojos.designPojos.ProductSpecification;
import com.swp391.JewelryProduction.repositories.ProductRepository;
import com.swp391.JewelryProduction.repositories.ProductSpecificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductSpecificationRepository productSpecificationRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll().stream().toList();
    }

    @Override
    public ProductSpecification findProductSpecificationByProductId(String id) {
        if(productSpecificationRepository.findByProductId(id).isPresent()) {
            return productSpecificationRepository.findByProductId(id).get();
        } else return null;
    }

    @Override
    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}
