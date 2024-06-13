package com.swp391.JewelryProduction.services.crawl;

import com.swp391.JewelryProduction.pojos.Material;

import java.io.IOException;
import java.util.List;

public interface ICrawlDataService {

    void crawData() throws IOException, InterruptedException;

    List<Material> getAll();

}
