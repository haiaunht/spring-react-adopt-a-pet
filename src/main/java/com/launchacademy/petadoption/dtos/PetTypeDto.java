package com.launchacademy.petadoption.dtos;

import com.launchacademy.petadoption.models.AdoptablePet;
import com.launchacademy.petadoption.models.PetType;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PetTypeDto {
  private Integer id;
  private String type;
  private String img_url;
  private String description;
  private List<AdoptablePet> adoptablePetList = new ArrayList<>();

  public static PetTypeDto fromPetType(PetType petType) {
    PetTypeDto petTypeDto = new PetTypeDto();
    petTypeDto.setType(petType.getType());
    petTypeDto.setImg_url(petType.getImg_url());
    petTypeDto.setDescription(petType.getDescription());
    petTypeDto.setAdoptablePetList(petType.getAdoptablePetList());
    return petTypeDto;
  }
}
