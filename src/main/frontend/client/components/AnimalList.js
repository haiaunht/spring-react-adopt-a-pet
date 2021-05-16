import React, { useState, useEffect } from "react"
import AnimalTile from "./AnimalTile.js"

const AnimalList = props => {
  const [animalType, setAnimalType] = useState({ adoptablePets: [] })

  const fetchAnimalType = async () => {
    try {
      const type = props.match.params.type
      const response = await fetch(`/api/v1/pets/${type}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const fetchedData = await response.json()
      setAnimalType(fetchedData.pet)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAnimalType()
  }, [props])

  const petList = animalType.adoptablePets.map(animal => {
    return (
      <AnimalTile
        key={animal.id}
        id={animal.id}
        name={animal.name}
        age={animal.age}
        vaccinationStatus={animal.vaccinationStatus}
        imgUrl={animal.imgUrl}
        type={animalType.type}
      />
    )
  })
  return <div>{petList}<br/><br/></div>
}

export default AnimalList
