package com.launchacademy.petadoption.dtos;

import com.launchacademy.petadoption.models.AdoptablePet;
import com.launchacademy.petadoption.models.PetType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class AdoptablePetDto {
  private Integer id;
  private String name;
  private String imgUrl;
  private Integer age;
  private Boolean vaccinationStatus;
  private String adoptionStory;
  private String adoptionStatus;
  private PetType petType;

  public static AdoptablePetDto fromAdoptablePet(AdoptablePet adoptablePet) {
    AdoptablePetDto adoptablePetDto = new AdoptablePetDto();
    adoptablePetDto.setName(adoptablePet.getName());
    adoptablePetDto.setImgUrl(adoptablePet.getImgUrl());
    adoptablePetDto.setAge(adoptablePet.getAge());
    adoptablePetDto.setVaccinationStatus(adoptablePet.getVaccinationStatus());
    adoptablePetDto.setAdoptionStory(adoptablePet.getAdoptionStory());
    adoptablePetDto.setAdoptionStatus(adoptablePet.getAdoptionStatus());
    adoptablePetDto.setPetType(adoptablePet.getPetType());
    return adoptablePetDto;
  }
}
