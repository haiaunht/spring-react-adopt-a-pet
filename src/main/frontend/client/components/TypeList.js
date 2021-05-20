import React, { useState, useEffect } from "react"
import TypeTile from "./TypeTile.js"

const TypeList = props => {
  const [pets, setPets] = useState([])

  const getTypes = async () => {
    try {
      // const response = await fetch("/api/v1/pets")
      const response = await fetch("/api/v1/pets")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseData = await response.json()
      // setPets(responseData.pets)
      setPets(responseData.content)
    } catch (error) {
      console.error(`Unable to complete data fetch.`)
    }
  }

  useEffect(() => {
    getTypes()
  }, [props])

  const typeObjects = pets.map(petType => {
    return (
      <TypeTile
          key={petType.id}
          id={petType.id}
          type={petType.type}
          imgUrl={petType.imgUrl}
          description={petType.description}
      />
    )
  })

  return (
      <div className="container">
        <div className="content">
          <div className="max-width-800">
            <div className="pet">{typeObjects}<br/><br/></div>
          </div>
        </div>
    </div>
  )
}


export default TypeList
