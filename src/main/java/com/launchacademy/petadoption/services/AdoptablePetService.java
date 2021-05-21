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
  private PetTypeService petTypeService;

  @Autowired
  public AdoptablePetService(
      AdoptablePetRepository adoptablePetRepo,
      AdoptableMapper adoptableMapper,
      PetTypeService petTypeService) {
    this.adoptablePetRepo = adoptablePetRepo;
    this.adoptableMapper = adoptableMapper;
    this.petTypeService = petTypeService;
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

//  public List<AdoptablePet> findAllByStatus(String type) {
//    List<AdoptablePet> result = new ArrayList<>();
//    PetType pet = petTypeService.findPetTypeBy(type);
//    for (AdoptablePet a : pet.getAdoptablePets()) {
//      if (a.getAdoptionStatus().equals("approved") || a.getAdoptionStatus().equals("denied")) {
//        result.add(a);
//      }
//    }
//    return result;
//  }
}
