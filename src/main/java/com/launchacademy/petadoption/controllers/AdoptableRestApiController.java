package com.launchacademy.petadoption.controllers;

import com.launchacademy.petadoption.dtos.AdoptablePetDto;
import com.launchacademy.petadoption.services.AdoptablePetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/adoptable-pets")
public class AdoptableRestApiController {
//
//  @Autowired
//  private AdoptablePetRepository adoptablePetRepo;
//
//  @GetMapping
//  public Page<AdoptablePet> getListOfAdoptablePet(Pageable pageable) {
//    return adoptablePetRepo.findAll(pageable);
//  }

  @Autowired
  private AdoptablePetService adoptablePetService;

  @GetMapping
  public Page<AdoptablePetDto> getListOfAdoptablePets(Pageable pageable) {
    return adoptablePetService.findAll(pageable);
  }

}
