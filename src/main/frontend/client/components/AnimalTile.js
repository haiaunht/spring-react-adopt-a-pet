import React from "react"
import { Link } from "react-router-dom"

const AnimalTile = props => {
  let vaccinated
  if (props.vaccinationStatus) {
    vaccinated = "Yes"
  } else {
    vaccinated = "No"
  }

  return (
      <div className="pet-box">
        <div className="pet-img">
          <h2><Link to={`/pets/${props.type}/${props.id}`}>{props.name}</Link></h2>
        </div>
        <div className="pet-details">
          <div>
            <Link to={`/pets/${props.type}/${props.id}`}>
              <img className="images thumbnail" src={props.imgUrl}></img>
            </Link>
            <p>
              <strong>Age:</strong> {props.age} months<br/>
              <strong>Vaccinated:</strong> {vaccinated}
            </p>
          </div>
        </div>

      </div>
  )
}
export default AnimalTile
