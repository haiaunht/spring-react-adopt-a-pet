package com.launchacademy.petadoption.controllers;

import com.launchacademy.petadoption.dtos.AdoptablePetDto;
import com.launchacademy.petadoption.models.AdoptablePet;
import com.launchacademy.petadoption.models.SurrenderPet;
import com.launchacademy.petadoption.repositories.AdoptablePetRepository;
import com.launchacademy.petadoption.services.AdoptablePetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/adoptions")
public class AdoptionApplicationRestApiController {

  @Autowired
  private AdoptablePetRepository adoptablePetRepo;

  @GetMapping
  public Page<AdoptablePet> getListOfAdoptablePet(Pageable pageable) {
    return adoptablePetRepo.findAll(pageable);
  }

  @PostMapping
  public AdoptablePet create(@RequestBody AdoptablePet adoptablePet) {
    return adoptablePetRepo.save(adoptablePet);
  }
}
