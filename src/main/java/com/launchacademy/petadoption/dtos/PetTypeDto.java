package com.launchacademy.petadoption.dtos;

import static com.launchacademy.petadoption.dtos.AdoptablePetDto.*;

import com.launchacademy.petadoption.models.AdoptablePet;
import com.launchacademy.petadoption.models.PetType;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
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
    /* petTypeDto.setAdoptablePetDtoList(fromAdoptablePetList(petType.getAdoptablePetList())); */
    List<AdoptablePetDto> list = new ArrayList<>();
    for (AdoptablePet x : petType.getAdoptablePetList()) {
      AdoptablePetDto adoptablePetDto = fromAdoptablePet(x);
      list.add(adoptablePetDto);
      petTypeDto.adoptablePetDtoList.add(adoptablePetDto);
    }
    return petTypeDto;
  }

}
