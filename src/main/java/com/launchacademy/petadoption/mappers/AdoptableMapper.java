package com.launchacademy.petadoption.mappers;

import com.launchacademy.petadoption.dtos.AdoptablePetDto;
import com.launchacademy.petadoption.models.AdoptablePet;
import java.util.List;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(injectionStrategy = InjectionStrategy.CONSTRUCTOR, componentModel = "spring")
public interface AdoptableMapper {
  AdoptablePetDto adoptablePetToAdoptablePetDto(AdoptablePet adoptablePet);
  List<AdoptablePetDto> adoptablePetsToAdoptablePetDtos(List<AdoptablePet> adoptablePets);
}
