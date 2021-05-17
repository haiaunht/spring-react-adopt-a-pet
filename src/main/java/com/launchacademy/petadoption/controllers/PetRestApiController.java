package com.launchacademy.petadoption.controllers;

import com.launchacademy.petadoption.dtos.PetTypeDto;
import com.launchacademy.petadoption.models.PetType;
import com.launchacademy.petadoption.repositories.PetTypeRepository;
import com.launchacademy.petadoption.services.PetTypeService;
import java.util.Optional;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
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


  private PetTypeService petTypeService;
  private PetTypeRepository petTypeRepository;

  @Autowired
  public PetRestApiController(PetTypeService petTypeService,
      PetTypeRepository petTypeRepository) {
    this.petTypeService = petTypeService;
    this.petTypeRepository = petTypeRepository;
  }

  @GetMapping
  public Page<PetTypeDto> getListOfPetTypes(Pageable pageable) {
    return petTypeService.findAll(pageable);
  }

//  @GetMapping("/{type}")
//  public PetType getType(@PathVariable String type) {
//    return petTypeService.findByType(type).get();
//  }

  @GetMapping("/{type}")
  public PetTypeDto getType(@PathVariable String type) {
    return petTypeService.findByType(type).get();
  }


  @NoArgsConstructor
  private class PetTypeNotFoundException extends RuntimeException {};

  @ControllerAdvice
  private class UrlNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(PetTypeNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String urlNotFoundHandler(PetTypeNotFoundException ex) {
      return ex.getMessage();
    }
  }
}
