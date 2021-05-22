package com.launchacademy.petadoption.controllers;

import com.launchacademy.petadoption.models.AdoptablePet;
import com.launchacademy.petadoption.models.SurrenderPet;
import com.launchacademy.petadoption.repositories.AdoptablePetRepository;
import com.launchacademy.petadoption.repositories.SurrenderPetRepository;
import com.launchacademy.petadoption.services.AdoptablePetService;
import com.launchacademy.petadoption.services.SurrenderPetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminsController {

  @Autowired
  private SurrenderPetService surrenderPetService;
  @Autowired
  private AdoptablePetService adoptablePetService;

  @GetMapping("/pending_applications")
  public Page<SurrenderPet> getListOfSurrenderPet(Pageable pageable) {
    return surrenderPetService.findAll(pageable);
  }

  @PostMapping
  public AdoptablePet create(@RequestBody AdoptablePet adoptablePet) {
    return adoptablePetService.save(adoptablePet);
  }

  @PostMapping("/delete/{id}")
  public void delete(@RequestBody SurrenderPet surrenderPet, @PathVariable Integer id) {
    surrenderPetService.deleteById(id);
  }
}
