package com.launchacademy.petadoption.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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

    @NotBlank
    @Column(name = "name", nullable = false)
    private String name;

    @NotBlank
    @Column(name = "img_url", nullable = false)
    private String imgUrl;

    @NotNull
    @Column(name = "age", nullable = false)
    private Integer age;

    @NotNull
    @Column(name = "vaccination_status", nullable = false)
    private Boolean vaccinationStatus;

    @NotBlank
    @Column(name = "adoption_story", nullable = false)
    private String adoptionStory;

    @NotBlank
    @Column(name = "adoption_status", nullable = false)
    private String adoptionStatus;

    @Column(name = "type_id", nullable = false, insertable = false, updatable = false)
    private Integer type_id;

    //@ManyToOne(fetch = FetchType.EAGER)
    @ManyToOne
    @JoinColumn(name = "type_id")
    @JsonIgnoreProperties("adoptablePets")
    private PetType petType;

    @OneToMany(mappedBy = "adoptablePet", orphanRemoval = true)
    @JsonIgnoreProperties("adoptablePet")
    private List<AdoptionApplication> applications = new ArrayList<>();
}
