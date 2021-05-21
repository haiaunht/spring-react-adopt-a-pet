package com.launchacademy.petadoption.controllers;

import com.launchacademy.petadoption.models.SurrenderPet;
import com.launchacademy.petadoption.repositories.SurrenderPetRepository;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestParam;
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

//  @PostMapping
//  public SurrenderPet create(@RequestBody SurrenderPet surrenderPet) {
//    return surrenderPetRepository.save(surrenderPet);
//  }

  @PostMapping
  public ResponseEntity create(@Valid @RequestBody SurrenderPet surrenderPet, BindingResult bindingResult) {
    if(bindingResult.hasErrors()) {
      return new ResponseEntity<List>(bindingResult.getAllErrors(), HttpStatus.NOT_ACCEPTABLE);
    }
    else {
      return new ResponseEntity<SurrenderPet>(surrenderPetRepository.save(surrenderPet), HttpStatus.CREATED);
    }
  }

  @PostMapping("/delete/{id}")
  public void delete(@RequestBody SurrenderPet surrenderPet, @PathVariable Integer id) {
//    surrenderPetRepository.deleteById(id);
    surrenderPetRepository.delete(surrenderPet);
  }
}
