package com.swp391.JewelryProduction.services.design;

import com.swp391.JewelryProduction.dto.DesignDTO;
import com.swp391.JewelryProduction.pojos.Design;
import com.swp391.JewelryProduction.repositories.DesignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DesignService implements IDesignService{
    private DesignRepository designRepository;

    @Autowired
    public DesignService(DesignRepository designRepository) {
        this.designRepository = designRepository;
    }

    @Override
    public List<DesignDTO> findAllDesigns() {
//        return designRepository.findAll().stream().map(design -> mapToDesignDTO(design)).collect(Collectors.toList());
        return null;
    }
}
