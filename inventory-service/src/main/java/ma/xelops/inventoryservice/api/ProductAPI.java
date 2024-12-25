package ma.xelops.inventoryservice.api;

import lombok.RequiredArgsConstructor;
import ma.xelops.inventoryservice.entities.Product;
import ma.xelops.inventoryservice.repository.ProductRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductAPI {
    private final ProductRepository productRepository;

    @GetMapping
    //@PreAuthorize("hasRole('ADMIN')")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
