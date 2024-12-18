package ma.xelops.inventoryservice;

import ma.xelops.inventoryservice.entities.Product;
import ma.xelops.inventoryservice.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class InventoryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(ProductRepository productRepository) {
        return args -> {
            productRepository.saveAll(List.of(
                    Product.builder().name("hp").description("description").price(4300.).quantity(15).build(),
                    Product.builder().name("Iphone").price(5000.).description("description").quantity(4).build(),
                    Product.builder().name("Printer").price(1000.).description("description").quantity(2).build()
            ));
        };
    }
}
