package ma.xelops.customerthymleafapp.controllers;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@AllArgsConstructor
@RequestMapping("/products")
public class ProductController {

    @GetMapping
    public String getCustomers(Model model) {
        return "products";
    }
}
