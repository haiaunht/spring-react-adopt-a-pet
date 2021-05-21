package com.launchacademy.petadoption.repositories;

import com.launchacademy.petadoption.models.AdoptablePet;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AdoptablePetRepository extends PagingAndSortingRepository<AdoptablePet, Integer> {

  @Modifying
  @Transactional
  @Query("UPDATE AdoptablePet a SET adoption_status = :adoptionStatus WHERE id = :id")
  public default void updateStatus(@Param("id") Integer id,
      @Param("adoptionStatus") String adoptionStatus) {
  }
}
