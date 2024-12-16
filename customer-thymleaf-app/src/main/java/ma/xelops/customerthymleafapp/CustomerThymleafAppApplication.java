package ma.xelops.customerthymleafapp;

import ma.xelops.customerthymleafapp.entities.Customer;
import ma.xelops.customerthymleafapp.repositories.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class CustomerThymleafAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerThymleafAppApplication.class, args);
    }
    @Bean
    public CommandLineRunner commandLineRunner(CustomerRepository customerRepository) {
        return args -> {
            customerRepository.saveAll(List.of(
                    Customer.builder().name("Salah Eddine").email("salaheddine@test.com").build(),
                    Customer.builder().name("Abdellah").email("abdellah@test.com").build(),
                    Customer.builder().name("Tamega Canadian").email("tamega.canadien@test.com").build(),
                    Customer.builder().name("Mguersef").email("mguersef@test.com").build()
            ));
        };
    }
}
