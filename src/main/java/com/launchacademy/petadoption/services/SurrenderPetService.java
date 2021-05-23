package com.launchacademy.petadoption.services;

import com.launchacademy.petadoption.models.SurrenderPet;
import com.launchacademy.petadoption.repositories.SurrenderPetRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SurrenderPetService {
  @Autowired
  private SurrenderPetRepository surrenderPetRepository;

  public Page<SurrenderPet> findAll(Pageable pageable) {
    return surrenderPetRepository.findAll(pageable);
  }

  public void delete(SurrenderPet surrenderPet) {
    surrenderPetRepository.delete(surrenderPet);
  }

  public Optional<SurrenderPet> findById(Integer id) {
    return surrenderPetRepository.findById(id);
  }

  public SurrenderPet save(SurrenderPet surrenderPet) {
    return surrenderPetRepository.save(surrenderPet);
  }

  public void deleteById(Integer id) {
    surrenderPetRepository.deleteById(id);
  }
}
