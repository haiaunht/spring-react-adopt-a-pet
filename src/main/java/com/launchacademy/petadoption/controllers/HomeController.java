package com.launchacademy.petadoption.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping(value = {"/pets", "/pets/{type}", "/pets/{type}/{id}", "/surrender/new", "/adoptions/new",
        "/admin/adoptions_check", "/admin", "/pending_applications", "/admin/surrender-review"})
    public String forward() {
        return "forward:/";
    }
}
