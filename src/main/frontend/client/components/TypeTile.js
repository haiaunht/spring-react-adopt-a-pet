import React from "react"
import { Link } from "react-router-dom"

const TypeTile = props => {
  return (

      <div className="pet-box">
          <div className="pet-img">
            <h2><Link to={`/pets/${props.type}`}>{props.type}</Link></h2>
          </div>

          <div>
            <Link to={`/pets/${props.type}`}>
              {" "}
              <img className="images thumbnail" src={props.imgUrl} ></img>
            </Link>
          </div>

          <div className="card-section">
            {props.description}
          </div>
          <br/>
      </div>
  )
}

export default TypeTile