package com.launchacademy.petadoption.services;

import com.launchacademy.petadoption.dtos.PetTypeDto;
import com.launchacademy.petadoption.mappers.PetTypeMapper;
import com.launchacademy.petadoption.models.PetType;
import com.launchacademy.petadoption.repositories.PetTypeRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PetTypeService {
  private PetTypeRepository petTypeRepo;
  private PetTypeMapper petTypeMapper;

  @Autowired
  public PetTypeService(PetTypeRepository petTypeRepo,
      PetTypeMapper petTypeMapper) {
    this.petTypeRepo = petTypeRepo;
    this.petTypeMapper = petTypeMapper;
  }

  //public List<PetType> findAll() {
  //  return (List<PetType>) petTypeRepo.findAll();
  //}

  public Page<PetTypeDto> findAll(Pageable pageable) {
    Page<PetType> page = petTypeRepo.findAll(pageable);
    return new PageImpl<>(petTypeMapper.petTypesToPetTypeDtos(page.getContent()), pageable, page.getTotalElements());
  }
}
