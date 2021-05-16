package com.launchacademy.petadoption.services;

import com.launchacademy.petadoption.dtos.AdoptablePetDto;
import com.launchacademy.petadoption.mappers.AdoptableMapper;
import com.launchacademy.petadoption.models.AdoptablePet;
import com.launchacademy.petadoption.repositories.AdoptablePetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AdoptablePetService {
  private AdoptablePetRepository adoptablePetRepo;
  private AdoptableMapper adoptableMapper;

  @Autowired
  public AdoptablePetService(
      AdoptablePetRepository adoptablePetRepo,
      AdoptableMapper adoptableMapper) {
    this.adoptablePetRepo = adoptablePetRepo;
    this.adoptableMapper = adoptableMapper;
  }
//public List<PetType> findAll() {
  //  return (List<PetType>) petTypeRepo.findAll();
  //}

  public Page<AdoptablePetDto> findAll(Pageable pageable) {
    Page<AdoptablePet> page = adoptablePetRepo.findAll(pageable);
    return new PageImpl<>(adoptableMapper.adoptablePetsToAdoptablePetDtos(page.getContent()), pageable, page.getTotalElements());
  }
}
