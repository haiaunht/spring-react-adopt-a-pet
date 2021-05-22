package com.launchacademy.petadoption.services;

import com.launchacademy.petadoption.models.SurrenderPet;
import com.launchacademy.petadoption.repositories.SurrenderPetRepository;
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

  public void deleteById(Integer id) {
    surrenderPetRepository.deleteById(id);
  }
}
