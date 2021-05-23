package com.launchacademy.petadoption.repositories;

import com.launchacademy.petadoption.models.AdoptablePet;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AdoptablePetRepository extends PagingAndSortingRepository<AdoptablePet, Integer> {

  @Query("SELECT a FROM AdoptablePet a WHERE a.adoptionStatus = 'approved' OR a.adoptionStatus = 'denied' AND a.petType = :type")
  public List<AdoptablePet> findAllByStatus(@Param("type") String type);
}
