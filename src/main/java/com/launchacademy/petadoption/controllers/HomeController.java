package com.launchacademy.petadoption.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping(value = {"/pets"})
    public String forward() {
        return "forward:/";
    }

    @GetMapping(value = {"/pets/{type}"})
    public String forwardToType() {
        return "forward:/pets/{type}";
    }
}
