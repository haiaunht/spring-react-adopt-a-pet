package com.launchacademy.petadoption.controllers;

import com.launchacademy.petadoption.models.AdoptablePet;
import com.launchacademy.petadoption.models.PetType;
import com.launchacademy.petadoption.repositories.AdoptablePetRepository;
import com.launchacademy.petadoption.repositories.PetTypeRepository;
import com.launchacademy.petadoption.services.AdoptablePetService;
import com.launchacademy.petadoption.services.PetTypeService;
import java.util.List;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/pets")
public class PetRestApiController {
  @Autowired
  private PetTypeService petTypeService;
  private PetTypeRepository petTypeRepository;
  private AdoptablePetRepository adoptPetRepo;

  @Autowired
  private AdoptablePetService adoptablePetService;

//  @Autowired
//  public PetRestApiController(PetTypeService petTypeService,
//      PetTypeRepository petTypeRepository, AdoptablePetRepository
//       adoptPetRepo, AdoptablePetService adoptablePetService) {
//    this.petTypeService = petTypeService;
//    this.petTypeRepository = petTypeRepository;
//    this.adoptPetRepo = adoptPetRepo;
//    this.adoptablePetService = adoptablePetService;
//  }

  @GetMapping
  public Page<PetType> listAll(Pageable pageable) {
    //return petTypeRepository.findAll(pageable);
    return petTypeService.findAll(pageable);
  }

  @GetMapping("/{type}")
  public PetType getType(@PathVariable String type) {
    //return petTypeRepository.findPetTypeBy(type);
    return petTypeService.findPetTypeBy(type);
  }


  @GetMapping("/{type}/{id}")
  public AdoptablePet getPetIdOfPetType(@PathVariable String type, @PathVariable Integer id) {
    PetType petType = petTypeService.findPetTypeBy(type);
    return adoptablePetService.findById(id).orElseThrow(() -> new PetTypeNotFoundException());
  }

  //just added
  @PostMapping("/delete/{id}")
  public void delete(@PathVariable Integer id) {
    adoptPetRepo.deleteById(id);
  }

  //just added
  @PostMapping("/update/{id}/{status}")
  public void update(@PathVariable Integer id, @PathVariable String status) {
    adoptablePetService.update(id, status);
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

  ////DTO not show list of petType.adoptableList
//  @GetMapping
//  public Page<PetTypeDto> getListOfPetTypes(Pageable pageable) {
//    return petTypeService.findAll(pageable);
//  }

//  @GetMapping("/{type}")
//  public PetTypeDto getType(@PathVariable String type) {
//    return petTypeService.findByType(type).get();
//  }
}
