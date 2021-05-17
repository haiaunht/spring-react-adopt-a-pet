package com.launchacademy.petadoption.mappers;

import com.launchacademy.petadoption.dtos.AdoptablePetDto;
import com.launchacademy.petadoption.models.AdoptablePet;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-05-17T15:27:34-0700",
    comments = "version: 1.3.0.Final, compiler: javac, environment: Java 15.0.1 (Oracle Corporation)"
)
@Component
public class AdoptableMapperImpl implements AdoptableMapper {

    @Override
    public AdoptablePetDto adoptablePetToAdoptablePetDto(AdoptablePet adoptablePet) {
        if ( adoptablePet == null ) {
            return null;
        }

        AdoptablePetDto adoptablePetDto = new AdoptablePetDto();

        adoptablePetDto.setId( adoptablePet.getId() );
        adoptablePetDto.setName( adoptablePet.getName() );
        adoptablePetDto.setImgUrl( adoptablePet.getImgUrl() );
        adoptablePetDto.setAge( adoptablePet.getAge() );
        adoptablePetDto.setVaccinationStatus( adoptablePet.getVaccinationStatus() );
        adoptablePetDto.setAdoptionStory( adoptablePet.getAdoptionStory() );
        adoptablePetDto.setAdoptionStatus( adoptablePet.getAdoptionStatus() );
        adoptablePetDto.setPetType( adoptablePet.getPetType() );

        return adoptablePetDto;
    }

    @Override
    public List<AdoptablePetDto> adoptablePetsToAdoptablePetDtos(List<AdoptablePet> adoptablePets) {
        if ( adoptablePets == null ) {
            return null;
        }

        List<AdoptablePetDto> list = new ArrayList<AdoptablePetDto>( adoptablePets.size() );
        for ( AdoptablePet adoptablePet : adoptablePets ) {
            list.add( adoptablePetToAdoptablePetDto( adoptablePet ) );
        }

        return list;
    }
}
