import React, { useState, useEffect } from "react"
import AnimalTile from "./AnimalTile.js"
import {Redirect} from "react-router-dom";

const AnimalList = props => {
  const [animalType, setAnimalType] = useState([])
  const [type, setType] = useState("")
  const [notFound, setNotFound] = useState(null)

  const fetchAnimalType = async () => {
    try {
      const type = props.match.params.type
      const response = await fetch(`/api/v1/pets/${type}`)
      if (!response.ok) {
        setNotFound(true)
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        if (response.status === 404) {
          setNotFound("not found")
        }
        throw error
      }
      const fetchedData = await response.json()
      setAnimalType(fetchedData.adoptablePets)
      setType(fetchedData.type)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAnimalType()
  }, [props])

  if (notFound) {
    return <Redirect to={"/404"} />
  }

  const petList = animalType.map(animal => {
    if (animal.adoptionStatus === "null" || animal.adoptionStatus === "denied") {
      return (
        <AnimalTile
            key={animal.id}
            id={animal.id}
            name={animal.name}
            age={animal.age}
            vaccinationStatus={animal.vaccinationStatus}
            imgUrl={animal.imgUrl}
            type={type}
        />
      )
    }

  })

  return (
  <>
    <div className="container">
      <div className="content">
        <div className="max-width-800">
          <p>
            These lovely faces needs your love!
          </p>
        </div>
        <div className="pet">{petList}<br/><br/></div>
      </div>
    </div>
  </>
  )
}

export default AnimalList
