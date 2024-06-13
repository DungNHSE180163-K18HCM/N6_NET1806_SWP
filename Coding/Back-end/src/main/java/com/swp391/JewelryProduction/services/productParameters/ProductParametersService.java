package com.swp391.JewelryProduction.services.productParameters;

import com.swp391.JewelryProduction.dto.ProductParametersDTO;
import com.swp391.JewelryProduction.repositories.ProductParametersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductParametersService implements IProductParametersService{
    private ProductParametersRepository productParametersRepository;

    @Autowired
    public ProductParametersService (ProductParametersRepository productParametersRepository) {
        this.productParametersRepository = productParametersRepository;
    }

    @Override
    public List<ProductParametersDTO> findAllProductParameters() {
//        return productParametersRepository.findAll().stream().map(productParameter -> mapToProductParametersDTO(productParameter)).collect(Collectors.toList());
        return null;
    }
}
