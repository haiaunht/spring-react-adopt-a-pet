package com.launchacademy.petadoption.controllers;

import com.launchacademy.petadoption.dtos.PetTypeDto;
import com.launchacademy.petadoption.services.PetTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/pet-types")
public class PetRestApiController {

//  @Autowired
//  private PetTypeRepository petTypeRepo;
//
//  @GetMapping
//  public Page<PetType> getListOfPetTypes(Pageable pageable) {
//    return petTypeRepo.findAll(pageable);
//  }

  @Autowired
  private PetTypeService petTypeService;

  @GetMapping
  public Page<PetTypeDto> getListOfPetTypes(Pageable pageable) {
    return petTypeService.findAll(pageable);
  }


}
