package com.launchacademy.petadoption.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="pet_surrender_applications")
@Getter
@Setter
@NoArgsConstructor
public class SurrenderPet {
  @Id
  @SequenceGenerator(name="pet_surrender_application_generator", sequenceName="pet_surrender_applications_id_seq", allocationSize = 1)
  @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="pet_surrender_application_generator")
  @Column(name="id", nullable=false, unique=true)
  private Integer id;
  private String name;
  private String phoneNumber;
  private String email;
  private String petName;
  private Integer petAge;
  private String petImageUrl;
  private Boolean vaccinationStatus;
  private String applicationStatus;
  private Integer petTypeId;
//  @ManyToOne(fetch = FetchType.LAZY)
//  @JoinColumn(name = "pet_type_id")
//  private PetType petType;
}
