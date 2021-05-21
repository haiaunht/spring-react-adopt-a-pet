import React, { useState } from "react"
import _ from "lodash"

import Error from "./Error"
import SuccessTile from "./SuccessTile";

const AdoptionForm = props => {
  console.log(props.id)
  const [submitSuccessful, setSubmitSuccessful] = useState(null)
  const [newAdoption, setNewAdoption] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    homeStatus: "",
    applicationStatus:"pending",
    adoptablePet: {id:""}
  })
  const [errors, setErrors] = useState([])

  const addNewApplication = async () => {
    let formPayload = newAdoption
    formPayload.petId = props.id
    formPayload.adoptablePet.id = formPayload.petId
    console.log(formPayload)
    try {
      const response = await fetch("/api/v1/adoptions-applications", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(formPayload)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      } else {
        const body = await response.json()
        setSubmitSuccessful(true)
        if (body.newApplication) {
          props.handleWhatToShow()
        }
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const isFormComplete = () => {
    let submitErrors = {}
    const requiredFields = ["name", "phoneNumber", "email", "homeStatus"]
    requiredFields.forEach(field => {
      if (newAdoption[field].trim() === "") {
        submitErrors = {...submitErrors, [field]: "is required." }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleChange = event => {
    setNewAdoption({
      ...newAdoption,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log(newAdoption)
    if (isFormComplete()) {
      addNewApplication(newAdoption)
    }
  }

  if (submitSuccessful) {
    return (
        <SuccessTile />
    )
  } else {
    return (
        <form onSubmit={handleSubmit} className="adoption_app">
          <div className="grid-contrainer">
            <div className="grid-x grid-padding-x">
              <div className="cell">
                <h2>Adopt me!</h2>
                <Error errors={errors} />
              </div>

              <div className="row">
                <div className="medium-6 columns">
                  <label htmlFor="name">
                    Your name
                    <input id="name" type="text" name="name" onChange={handleChange} value={newAdoption.name} />
                  </label>
                </div>

                <div className="medium-6 columns">
                  <label htmlFor="phoneNumber">
                    Phone Number
                    <input
                        id="phoneNumber"
                        type="text"
                        name="phoneNumber"
                        onChange={handleChange}
                        value={newAdoption.phoneNumber}
                    />
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="medium-6 columns">
                  <label htmlFor="email">
                    Email Address
                    <input
                        id="email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={newAdoption.email}
                    />
                  </label>
                </div>

                <div className="medium-6 columns">
                  <label htmlFor="homeStatus">
                    Own or Rent Your Home?
                    <select
                        id="homeStatus"
                        name="homeStatus"
                        onChange={handleChange}
                        value={newAdoption.homeStatus}
                    >
                      <option value="">Please Select</option>
                      <option value="Own">Own</option>
                      <option value="Rent">Rent</option>
                    </select>
                  </label>
                </div>
              </div>

              <label htmlFor="applicationStatus">
                <input
                    id="applicationStatus"
                    type="text"
                    name="applicationStatus"
                    value="pending" hidden
                />
              </label>

              <input className="button round" type="submit" value="Apply" />
            </div>
          </div>
        </form>
    )
  }


}

export default AdoptionForm
