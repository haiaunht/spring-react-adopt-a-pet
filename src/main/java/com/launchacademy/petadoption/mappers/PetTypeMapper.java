package com.launchacademy.petadoption.mappers;

import com.launchacademy.petadoption.dtos.PetTypeDto;
import com.launchacademy.petadoption.models.PetType;
import java.util.List;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(injectionStrategy = InjectionStrategy.CONSTRUCTOR, componentModel = "spring")
public interface PetTypeMapper {
  PetTypeDto petTypeToPetTypeDto(PetType petType);
  List<PetTypeDto> petTypesToPetTypeDtos(List<PetType> petTypes);
}
