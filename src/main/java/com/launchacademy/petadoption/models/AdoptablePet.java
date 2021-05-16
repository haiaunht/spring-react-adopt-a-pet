package com.launchacademy.petadoption.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name="adoptable_pets")
@Getter
@Setter
@NoArgsConstructor
public class AdoptablePet {
    @Id
    @SequenceGenerator(name="adoptable_pet_generator", sequenceName="adoptable_pets_id_seq", allocationSize = 1)
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="adoptable_pet_generator")
    @Column(name="id", nullable=false, unique=true)
    private Integer id;
    private String name;
    private String imgUrl;
    private Integer age;
    private Boolean vaccinationStatus;
    private String adoptionStory;
    private String adoptionStatus;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "type_id")
    @JsonIgnoreProperties("adoptablePetList")
    private PetType petType;
}
