package com.launchacademy.petadoption.controllers;

import com.launchacademy.petadoption.models.AdoptionApplication;
import com.launchacademy.petadoption.repositories.AdoptionApplicationRepository;
import com.launchacademy.petadoption.services.AdoptionApplicationService;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/adoptions-applications")
public class AdoptionApplicationRestApiController {

  @Autowired
  private AdoptionApplicationRepository adoptionApplicationRepo;

  @Autowired
  private AdoptionApplicationService service;

  @GetMapping
  public Page<AdoptionApplication> getListOfAdoptionApplications(Pageable pageable) {
    return adoptionApplicationRepo.findAll(pageable);
  }

  @PostMapping
  public ResponseEntity create(@Valid @RequestBody AdoptionApplication adoptionApplication, BindingResult bindingResult) {
    if(bindingResult.hasErrors()) {
      return new ResponseEntity<List>(bindingResult.getAllErrors(), HttpStatus.NOT_ACCEPTABLE);
    }
    else {
      return new ResponseEntity<AdoptionApplication>(adoptionApplicationRepo.save(adoptionApplication), HttpStatus.CREATED);
    }
  }

  @PostMapping("/update/{id}/{status}")
  public void update(@PathVariable Integer id, @PathVariable String status) {
    service.update(id, status);
  }

  @PostMapping("/delete/{id}")
  public void delete(@RequestBody AdoptionApplication adoptionApplication, @PathVariable Integer id) {
    adoptionApplicationRepo.delete(adoptionApplication);
  }
}
