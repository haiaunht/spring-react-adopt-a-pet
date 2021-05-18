package com.launchacademy.petadoption.mappers;

import com.launchacademy.petadoption.dtos.PetTypeDto;
import com.launchacademy.petadoption.models.PetType;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-05-18T08:06:41-0700",
    comments = "version: 1.3.0.Final, compiler: javac, environment: Java 15.0.1 (Oracle Corporation)"
)
@Component
public class PetTypeMapperImpl implements PetTypeMapper {

    @Override
    public PetTypeDto petTypeToPetTypeDto(PetType petType) {
        if ( petType == null ) {
            return null;
        }

        PetTypeDto petTypeDto = new PetTypeDto();

        petTypeDto.setId( petType.getId() );
        petTypeDto.setType( petType.getType() );
        petTypeDto.setImgUrl( petType.getImgUrl() );
        petTypeDto.setDescription( petType.getDescription() );

        return petTypeDto;
    }

    @Override
    public List<PetTypeDto> petTypesToPetTypeDtos(List<PetType> petTypes) {
        if ( petTypes == null ) {
            return null;
        }

        List<PetTypeDto> list = new ArrayList<PetTypeDto>( petTypes.size() );
        for ( PetType petType : petTypes ) {
            list.add( petTypeToPetTypeDto( petType ) );
        }

        return list;
    }
}
