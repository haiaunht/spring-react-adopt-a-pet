package com.launchacademy.petadoption.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping(value = {"/pets", "/pets/{type}", "/pets/{type}/{id}", "/surrender/new", "/adoptions", "/admin/adoptions_check", "/admin", "/pending_applications"})
//    public String forward() {
//        return "forward:/";
//    }
    public String forward() {
        return "forward:/index.html";
    }
}
