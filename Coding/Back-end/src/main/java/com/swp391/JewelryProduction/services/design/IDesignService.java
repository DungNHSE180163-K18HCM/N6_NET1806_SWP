package com.swp391.JewelryProduction.services.design;

import com.swp391.JewelryProduction.dto.DesignDTO;

import java.util.List;

public interface IDesignService {
    List<DesignDTO> findAllDesigns();
}
