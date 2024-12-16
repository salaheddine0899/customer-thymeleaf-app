package ma.xelops.customerthymleafapp.controllers;

import lombok.AllArgsConstructor;
import ma.xelops.customerthymleafapp.repositories.CustomerRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@AllArgsConstructor
@RequestMapping("/customers")
public class CustomerController {
    private CustomerRepository customerRepository;

    @GetMapping
    public String getCustomers(Model model) {
        var customers = customerRepository.findAll();
        model.addAttribute("customers", customers);
        return "customers";
    }
}
