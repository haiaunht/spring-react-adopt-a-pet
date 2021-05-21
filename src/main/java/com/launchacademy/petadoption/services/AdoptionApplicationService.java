package com.launchacademy.petadoption.services;

import com.launchacademy.petadoption.models.AdoptablePet;
import com.launchacademy.petadoption.models.AdoptionApplication;
import com.launchacademy.petadoption.repositories.AdoptablePetRepository;
import com.launchacademy.petadoption.repositories.AdoptionApplicationRepository;
import javax.persistence.Access;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdoptionApplicationService {
  @Autowired
  private AdoptionApplicationRepository repo;

  public void update(Integer id, String status) {
    AdoptionApplication test = repo.findById(id).get();
    test.setApplicationStatus(status);
    repo.save(test);
  }
}
