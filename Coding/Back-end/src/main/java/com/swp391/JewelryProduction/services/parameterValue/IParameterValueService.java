package com.swp391.JewelryProduction.services.parameterValue;

import com.swp391.JewelryProduction.dto.ParameterValueDTO;

import java.util.List;

public interface IParameterValueService {
    List<ParameterValueDTO> findAllParameterValues();
}
