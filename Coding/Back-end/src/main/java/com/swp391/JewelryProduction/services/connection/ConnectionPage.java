package com.swp391.JewelryProduction.services.connection;

import org.jsoup.nodes.Document;

import java.io.IOException;

public interface ConnectionPage {

    Document getConnection(String url) throws IOException;

}
