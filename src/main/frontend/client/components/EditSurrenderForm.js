import _ from "lodash"
import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import SuccessfulSubmission from "./SuccessfulSubmission";

import Error from "./Error"

const EditSurrenderForm = props => {
  console.log(props.surrender)
  const [submitSuccessful, setSubmitSuccessful] = useState(false)

  const [newSurrender, setNewSurrender] = useState({
    name: props.surrender.name,
    phoneNumber: props.surrender.phoneNumber,
    email: props.surrender.email,
    petName: props.surrender.petName,
    petAge: props.surrender.petAge,
    petTypeId: props.surrender.petTypeId,
    petImageUrl: props.surrender.petImageUrl,
    vaccinationStatus: props.surrender.vaccinationStatus,
    applicationStatus: "pending"
  })

  console.log(newSurrender)

  const [errors, setErrors] = useState([])
  const [redirect, setRedirect] = useState(false)

  const updateSurrenderForm = async () => {
    try {
      const response = await fetch("/api/v1/surrender/update", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newSurrender)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const data = await response.json()
          return setErrors(data.errors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        const data = await response.json()
        if (data) {
          setRedirect(true)
          setSubmitSuccessful(true)
        }
      }
    } catch (error) {
      console.error(`Error in fetch: ${error}`)
    }
  }

  const handleInput = event => {
    setNewSurrender({
      ...newSurrender,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validateInput = () => {
    let submissionErrors = {}
    const requiredFields = [
      "name",
      "phoneNumber",
      "email",
      "petName",
      "petAge",
      "petTypeId",
      "petImageUrl",
      "vaccinationStatus"
    ]
    requiredFields.forEach(field => {
      if (newSurrender[field].trim() === "") {
        submissionErrors = { ...submissionErrors, [field]: `is required` }
      }
    })
    setErrors(submissionErrors)
    console.log(newSurrender)
    return _.isEmpty(submissionErrors)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // if (validateInput()) {
      updateSurrenderForm()
      console.log(newSurrender)
    // }
  }

  if (submitSuccessful) {
    return (
        <SuccessfulSubmission submitSuccessful={submitSuccessful} userName={newSurrender.name} />
    )
  } else {

    return (
        <div id="surrender-form">
          <h2>Please edit you form: </h2>
          <div className="surrender-form-container">
            {/*<form onSubmit={handleSubmit} className="adoption_app">*/}
            <form onSubmit={handleSubmit} className="surrender-form-box">
              {/*<div className="grid-contrainer">*/}
              {/*  <div className="grid-x grid-padding-x">*/}
              <div className="cell">
                <Error errors={errors}/>
              </div>

              {/*<div className="row">*/}
              {/*  <div className="medium-6 columns">*/}
              <label htmlFor="name">
                Your Name:
                <input
                    id="name"
                    type="text"
                    name="name"
                    onChange={handleInput}
                    value={newSurrender.name}
                />
              </label>
              {/*</div>*/}

              {/*<div className="medium-6 columns">*/}
              <label htmlFor="phoneNumber">
                Phone:
                <input
                    id="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    onChange={handleInput}
                    value={newSurrender.phoneNumber}
                />
              </label>
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="row">*/}
              {/*  <div className="medium-6 columns">*/}
              <label htmlFor="email">
                Email:
                <input
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleInput}
                    value={newSurrender.email}
                />
              </label>
              {/*</div>*/}

              {/*<div className="medium-6 columns">*/}
              <label htmlFor="petName">
                Pets Name:
                <input
                    id="petName"
                    type="text"
                    name="petName"
                    onChange={handleInput}
                    value={newSurrender.petName}
                />
              </label>
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="row">*/}
              {/*  <div className="medium-6 columns">*/}
              <label htmlFor="petImageUrl">
                Picture of your pet:
                <input
                    id="petImageUrl"
                    type="url"
                    name="petImageUrl"
                    onChange={handleInput}
                    value={newSurrender.petImageUrl}
                />
              </label>
              {/*</div>*/}

              {/*<div className="medium-6 columns">*/}
              <label htmlFor="petAge">
                Pets Age (in months):
                <input
                    id="petAge"
                    type="text"
                    name="petAge"
                    onChange={handleInput}
                    value={newSurrender.petAge}
                />
              </label>
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="row">*/}
              {/*  <div className="medium-6 columns">*/}
              <label htmlFor="petTypeId">
                Pet Type:
                <select
                    id="petTypeId"
                    name="petTypeId"
                    value={newSurrender.petTypeId}
                    onChange={handleInput}
                >
                  <option value="">Please Select</option>
                  <option value="1">Puppies</option>
                  <option value="2">Kitties</option>
                </select>
              </label>
              {/*</div>*/}

              {/*<div className="medium-6 columns">*/}
              <label htmlFor="vaccinationStatus">
                Vaccinated?
                <select
                    id="vaccinationStatus"
                    name="vaccinationStatus"
                    value={newSurrender.vaccinationStatus}
                    onChange={handleInput}
                >
                  <option value="">Please Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
              {/*  </div>*/}
              {/*</div>*/}

              <label htmlFor="applicationStatus">
                <input
                    id="applicationStatus"
                    type="text"
                    name="applicationStatus"
                    defaultValue="pending" hidden
                />
              </label>

              <input id="surrender-btn" type="submit" value="Submit"/>
              {/*  </div>*/}
              {/*</div>*/}
            </form>
          </div>
        </div>
    )
  }
}
export default EditSurrenderForm