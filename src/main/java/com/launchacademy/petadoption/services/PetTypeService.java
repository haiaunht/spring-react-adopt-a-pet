package com.launchacademy.petadoption.services;

import com.launchacademy.petadoption.models.PetType;
import com.launchacademy.petadoption.repositories.PetTypeRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PetTypeService {
  private PetTypeRepository petTypeRepo;

  @Autowired
  public PetTypeService(PetTypeRepository petTypeRepo) {
    this.petTypeRepo = petTypeRepo;
  }

  public Optional<PetType> findPetTypeBy(String type) {
    return petTypeRepo.findPetTypeBy(type);
  }

  public Page<PetType> findAll(Pageable pageable) {
    return petTypeRepo.findAll(pageable);
  }

}
