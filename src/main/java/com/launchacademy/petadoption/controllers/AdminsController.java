package com.launchacademy.petadoption.controllers;

import com.launchacademy.petadoption.models.AdoptablePet;
import com.launchacademy.petadoption.models.SurrenderPet;
import com.launchacademy.petadoption.repositories.AdoptablePetRepository;
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
@RequestMapping("/api/v1/admin")
public class AdminsController {
  @Autowired
  private SurrenderPetRepository surrenderPetRepository;
  @Autowired
  private AdoptablePetRepository adoptRepo;

  //call all of surrender forms to render

  //render a surrender by id to edit
  //update an specific surrender form to pending -> approve or denied

  @GetMapping("/pending_applications")
  public Page<SurrenderPet> getListOfSurrenderPet(Pageable pageable) {
    return surrenderPetRepository.findAll(pageable);
  }

  @PostMapping
  public AdoptablePet create(@RequestBody AdoptablePet adoptablePet) {
    return adoptRepo.save(adoptablePet);
  }
}
