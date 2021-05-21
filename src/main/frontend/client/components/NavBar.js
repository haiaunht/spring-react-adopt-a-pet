import React from "react"
import { Link } from "react-router-dom"

const NavBar = () => {

  return (
      <nav className="navbar">
        <div className="title-bar">
          <div className="top-bar-left">
            <ul className="menu">
              <li>
                <Link to="/pets">Home</Link>
              </li>

              <li>
                <Link to="/pets/Puppies">Puppies</Link>
              </li>
              <li>
                <Link to="/pets/Kitties">Kitties</Link>
              </li>

              <li className="right">
                <Link to="/adoptions/new">Surrender Your Pet</Link>
                {/*<Link to="/surrender/new">Surrender Your Pet</Link>*/}
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default NavBar
