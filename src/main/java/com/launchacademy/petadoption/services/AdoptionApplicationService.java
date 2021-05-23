package com.launchacademy.petadoption.services;

import com.launchacademy.petadoption.models.AdoptionApplication;
import com.launchacademy.petadoption.repositories.AdoptionApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AdoptionApplicationService {
  @Autowired
  private AdoptionApplicationRepository repo;

  public Page<AdoptionApplication> findAll(Pageable pageable) {
    return repo.findAll(pageable);
  }

  public AdoptionApplication save(AdoptionApplication adoptionApplication) {
    return repo.save(adoptionApplication);
  }

  public void update(Integer id, String status) {
    AdoptionApplication test = repo.findById(id).get();
    test.setApplicationStatus(status);
    repo.save(test);
  }

  public void delete(AdoptionApplication adoptionApplication) {
    repo.delete(adoptionApplication);
  }
}
