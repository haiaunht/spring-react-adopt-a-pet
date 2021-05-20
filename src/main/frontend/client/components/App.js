import React from "react"
import { hot } from "react-hot-loader/root"
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom"
import "regenerator-runtime/runtime"
import "../public/style.css"

import TypeList from "./TypeList.js"
import AnimalList from "./AnimalList.js"
import AnimalShow from "./AnimalShow.js"
import SurrenderForm from "./SurrenderForm"
import SuccessTile from "./SuccessTile.js"
import NavBar from "./NavBar.js"
import AdoptionForm from "./AdoptionForm";
import PendingApplications from "./PendingApplications.js";
import Admin from "./Admin.js";

const App = props => {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="grid-container no-bullet">
        <div className="grid-x grid-margin-x text-center">
          <Switch>
            <Route exact path="/">
              <Redirect to="/pets" />
            </Route>
            <Route exact path="/pets" component={TypeList} />
            <Route exact path="/pets/:type" component={AnimalList} />
            <Route exact path="/pets/:type/:id" component={AnimalShow} />
            {/*<Route exact path="/adoptions" component={SuccessTile} />*/}
            <Route exact path="/adoptions/new" component={AdoptionForm} />
            {/*<Route exact path="/adoptions/new" component={SurrenderForm} />*/}
            <Route exact path="/surrender/new" component={SurrenderForm} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/pending_applications" component={PendingApplications} />

          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}
export default hot(App)
