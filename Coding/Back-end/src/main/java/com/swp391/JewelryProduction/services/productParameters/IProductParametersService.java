package com.swp391.JewelryProduction.services.productParameters;

import com.swp391.JewelryProduction.dto.ProductParametersDTO;

import java.util.List;

public interface IProductParametersService {
    List<ProductParametersDTO> findAllProductParameters();
}
