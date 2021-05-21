package com.launchacademy.petadoption.services;

import com.launchacademy.petadoption.dtos.AdoptablePetDto;
import com.launchacademy.petadoption.mappers.AdoptableMapper;
import com.launchacademy.petadoption.models.AdoptablePet;
import com.launchacademy.petadoption.repositories.AdoptablePetRepository;
import org.attoparser.dom.INestableNode;
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


  public Page<AdoptablePetDto> findAll(Pageable pageable) {
    Page<AdoptablePet> page = adoptablePetRepo.findAll(pageable);
    return new PageImpl<>(adoptableMapper.adoptablePetsToAdoptablePetDtos(page.getContent()), pageable, page.getTotalElements());
  }

  public AdoptablePet findById(Integer id) {
    return adoptablePetRepo.findById(id).get();
  }

  public void update(Integer id, String status) {
    AdoptablePet test = adoptablePetRepo.findById(id).get();
    test.setAdoptionStatus(status);
    adoptablePetRepo.save(test);
  }
}
