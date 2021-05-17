package com.launchacademy.petadoption.controllers;

import com.launchacademy.petadoption.models.SurrenderPet;
import com.launchacademy.petadoption.repositories.SurrenderPetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/surrender")
public class SurrendersController {

  @Autowired
  private SurrenderPetRepository surrenderPetRepository;

  @GetMapping("/new")
  public Page<SurrenderPet> getListOfSurrenderPet(Pageable pageable) {
    return surrenderPetRepository.findAll(pageable);
  }

  @PostMapping
  public SurrenderPet create(@RequestBody SurrenderPet surrenderPet) {
    return surrenderPetRepository.save(surrenderPet);
  }
}
