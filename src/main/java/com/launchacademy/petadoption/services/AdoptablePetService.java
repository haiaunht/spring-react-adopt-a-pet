package com.launchacademy.petadoption.services;

import com.launchacademy.petadoption.dtos.AdoptablePetDto;
import com.launchacademy.petadoption.mappers.AdoptableMapper;
import com.launchacademy.petadoption.models.AdoptablePet;
import com.launchacademy.petadoption.models.PetType;
import com.launchacademy.petadoption.repositories.AdoptablePetRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.swing.text.html.Option;
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

  public Optional<AdoptablePet> findById(Integer id) {
    return adoptablePetRepo.findById(id);
  }

  public void update(Integer id, String status) {
    AdoptablePet test = adoptablePetRepo.findById(id).get();
    test.setAdoptionStatus(status);
    adoptablePetRepo.save(test);
  }

  public AdoptablePet save(AdoptablePet adoptablePet) {
    return adoptablePetRepo.save(adoptablePet);
  }

  public void deleteById(Integer id) {
    adoptablePetRepo.deleteById(id);
  }
}
