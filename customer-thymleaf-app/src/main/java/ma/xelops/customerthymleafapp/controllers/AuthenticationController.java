package ma.xelops.customerthymleafapp.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/auth")
public class AuthenticationController {

    @GetMapping
    @ResponseBody
    public Authentication getAuthentication(Authentication authentication) {
        return authentication;
    }
}
