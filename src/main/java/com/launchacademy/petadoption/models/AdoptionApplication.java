package com.launchacademy.petadoption.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="adoption_application")
@Getter
@Setter
@NoArgsConstructor
public class AdoptionApplication {
  @Id
  @SequenceGenerator(name="adoption_application_generator", sequenceName="adoption_application_id_seq", allocationSize = 1)
  @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="adoption_application_generator")
  @Column(name="id", nullable=false, unique=true)
  private Integer id ;

  @NotBlank
  @Column(name = "name")
  private String name;

  @NotBlank
  @Column(name = "phone_number")
  private String phoneNumber;

  @NotBlank
  @Email(message = "should be a valid email")
  @Column(name = "email")
  private String email;

  @NotBlank
  @Column(name = "home_status")
  private String homeStatus;

  @NotBlank
  @Column(name = "application_status")
  private String applicationStatus;

  @ManyToOne
  @JoinColumn(name = "pet_id")
  @JsonIgnoreProperties("applications")
  private AdoptablePet adoptablePet;
}
