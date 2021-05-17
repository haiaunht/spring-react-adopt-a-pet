package com.launchacademy.petadoption.repositories;

import com.launchacademy.petadoption.models.SurrenderPet;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurrenderPetRepository extends PagingAndSortingRepository<SurrenderPet, Integer> {

}
