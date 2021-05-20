package com.launchacademy.petadoption.controllers;

import com.launchacademy.petadoption.models.AdoptionApplication;
import com.launchacademy.petadoption.models.SurrenderPet;
import com.launchacademy.petadoption.repositories.AdoptionApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

  @GetMapping
  public Page<AdoptionApplication> getListOfAdoptionApplications(Pageable pageable) {
    return adoptionApplicationRepo.findAll(pageable);
  }

  @PostMapping
  public AdoptionApplication create(@RequestBody AdoptionApplication adoptionApplication) {
    return adoptionApplicationRepo.save(adoptionApplication);
  }

  @PostMapping("/delete/{id}")
  public void delete(@RequestBody AdoptionApplication adoptionApplication, @PathVariable Integer id) {
//    adoptionApplicationRepo.deleteById(id);
    adoptionApplicationRepo.delete(adoptionApplication);
  }
}
