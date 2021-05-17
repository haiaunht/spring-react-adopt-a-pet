import React from "react"
import { Link } from "react-router-dom"

const TypeTile = props => {
  //const { type, description, imgUrl } = props.petType
  //console.log(props.imgUrl)
  return (
      <div className="cell">
      {/*//<div className="pet-container">*/}
        <div className="card">
          <div className="card-devider">
            <h1><Link to={`/pets/${props.type}`}>{props.type}</Link></h1>
          </div>
          {/*<img className="images thumbnail" src={props.imgUrl} />*/}
          <div>
            <Link to={`/pets/${props.type}`}>
              {" "}
              <img className="images thumbnail" src={props.imgUrl} />
            </Link>
          </div>
          <div className="card-section">
            {props.description}
          </div>
          <br/>
        </div>
      </div>
  )
}

export default TypeTile
