package com.launchacademy.petadoption.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping(value = {"/pets", "/pets/{type}", "/pets/{type}/{id}", "/surrender/new", "/adoptions", "/admin/adoptions_check", "/admin"})
    public String forward() {
        return "forward:/";
    }

//    @GetMapping(value = {"/pets/{type}"})
//    public String forwardToType() {
//        return "forward:/pets";
//    }
//
//    @GetMapping(value = {"/pets/{type}/{id}"})
//    public String forwardToTypeId() {
//        return "forward:/pets";
//    }

//    @GetMapping(value = {"/surrender/new"})
//    public String forwardToForm() {
//        return "forward:/pets";
//    }
}
