package com.launchacademy.petadoption.controllers;

import com.launchacademy.petadoption.models.SurrenderPet;
import com.launchacademy.petadoption.repositories.SurrenderPetRepository;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
  public ResponseEntity create(@Valid @RequestBody SurrenderPet surrenderPet, BindingResult bindingResult) {
    if(bindingResult.hasErrors()) {
      return new ResponseEntity<List>(bindingResult.getAllErrors(), HttpStatus.NOT_ACCEPTABLE);
    }
    else {
      return new ResponseEntity<SurrenderPet>(surrenderPetRepository.save(surrenderPet), HttpStatus.CREATED);
    }
  }

  @PostMapping("/update/{id}")
  public void update(@PathVariable Integer id, @RequestBody SurrenderPet surrenderPet) {
    Optional<SurrenderPet> pet = surrenderPetRepository.findById(id);
    pet.get().setName(surrenderPet.getName());
    pet.get().setPhoneNumber(surrenderPet.getPhoneNumber());
    pet.get().setEmail(surrenderPet.getEmail());
    pet.get().setPetName(surrenderPet.getPetName());
    pet.get().setPetAge(surrenderPet.getPetAge());
    pet.get().setPetImageUrl(surrenderPet.getPetImageUrl());
    pet.get().setVaccinationStatus(surrenderPet.getVaccinationStatus());
    pet.get().setApplicationStatus(surrenderPet.getApplicationStatus());
    pet.get().setPetTypeId(surrenderPet.getPetTypeId());
    surrenderPetRepository.save(pet.get());
  }

  @PostMapping("/delete/{id}")
  public void delete(@RequestBody SurrenderPet surrenderPet, @PathVariable Integer id) {
    surrenderPetRepository.delete(surrenderPet);
  }
}
