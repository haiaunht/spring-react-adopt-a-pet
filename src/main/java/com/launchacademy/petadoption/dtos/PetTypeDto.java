package com.launchacademy.petadoption.dtos;

import com.launchacademy.petadoption.models.AdoptablePet;
import com.launchacademy.petadoption.models.PetType;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
@NoArgsConstructor
public class PetTypeDto {
  private Integer id;
  private String type;
  private String img_url;
  private String description;
  private List<AdoptablePetDto> adoptablePetDtoList = new ArrayList<>();

  public static PetTypeDto fromPetType(PetType petType) {
    PetTypeDto petTypeDto = new PetTypeDto();
    petTypeDto.setType(petType.getType());
    petTypeDto.setImg_url(petType.getImg_url());
    petTypeDto.setDescription(petType.getDescription());
    petTypeDto.setAdoptablePetDtoList(petType.getAdoptablePetList());
    return petTypeDto;
  }

  private void setAdoptablePetDtoList(List<AdoptablePet> adoptablePetList) {
    List<AdoptablePetDto> adoptablePetDtoList = new ArrayList<>();
    for (AdoptablePet a : adoptablePetList) {
      AdoptablePetDto dto = new AdoptablePetDto();
      dto.setName(a.getName());
      dto.setImgUrl(a.getImgUrl());
      dto.setAge(a.getAge());
      dto.setVaccinationStatus(a.getVaccinationStatus());
      dto.setAdoptionStory(a.getAdoptionStory());
      dto.setAdoptionStatus(a.getAdoptionStatus());
      dto.setPetType(a.getPetType());
      adoptablePetDtoList.add(dto);
    }
  }
}
