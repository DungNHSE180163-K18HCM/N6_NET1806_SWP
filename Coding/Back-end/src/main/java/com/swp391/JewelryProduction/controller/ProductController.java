package com.swp391.JewelryProduction.controller;

import com.swp391.JewelryProduction.pojos.designPojos.Product;
import com.swp391.JewelryProduction.pojos.designPojos.ProductSpecification;
import com.swp391.JewelryProduction.services.product.ProductService;
import com.swp391.JewelryProduction.util.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/collection")
public class ProductController {
    private final ProductService productService;

    @GetMapping("/get-product-list")
    public ResponseEntity<Response> getProducts() {
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Request send successfully.")
                .response("product-list", productService.findAll())
                .buildEntity();
    }

    @GetMapping("/{productId}/specification")
    public ResponseEntity<Response> getProductSpecification(@PathVariable String productId) {
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Request send successfully.")
                .response("product-specification", productService.findProductSpecificationByProductId(productId))
                .buildEntity();
    }

    @PostMapping("/{productId}/remove")
    public ResponseEntity<Response> removeProduct(@PathVariable String productId) {
        productService.deleteProduct(productId);
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Request send successfully.")
                .buildEntity();
    }

    @PostMapping("/create")
    public ResponseEntity<Response> createProduct(@RequestBody Product product) {
        productService.saveProduct(product);
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Request send successfully.")
                .buildEntity();
    }
}
