package com.launchacademy.petadoption.repositories;

import com.launchacademy.petadoption.models.PetType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PetTypeRepository extends PagingAndSortingRepository<PetType, Integer> {
  @Query("SELECT p FROM PetType p WHERE p.type = :type")
  public PetType findPetTypeBy(@Param("type") String type);

}
