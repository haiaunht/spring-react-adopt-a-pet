import _ from "lodash"
import React, { useState } from "react"
import SuccessfulSubmission from "./SuccessfulSubmission";

import Error from "./Error"

const SurrenderForm = props => {
  const [submitSuccessful, setSubmitSuccessful] = useState(false)

  const [newSurrender, setNewSurrender] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    petName: "",
    petAge: "",
    petTypeId: "",
    petImageUrl: "",
    vaccinationStatus: "",
    applicationStatus: "pending"
  })

  if (props.surrender) {
    newSurrender.name = props.surrender.name
    newSurrender.phoneNumber = props.surrender.phoneNumber
    newSurrender.email = props.surrender.email
    newSurrender.petName = props.surrender.petName
    newSurrender.petAge = props.surrender.petAge
    newSurrender.petTypeId = props.surrender.petTypeId
    newSurrender.petImageUrl = props.surrender.petImageUrl
    newSurrender.vaccinationStatus = props.surrender.vaccinationStatus
    newSurrender.vaccinationStatus = props.surrender.adoptionStatus
  }

  const [newAdoptablePet, setNewAdoptablePet] = useState({
    name: "",
    imgUrl: "",
    age: "",
    vaccinationStatus: "",
    adoptionStory: "",
    adoptionStatus: "",
    petType: {}
  })

  const [errors, setErrors] = useState([])
  const [redirect, setRedirect] = useState(false)

  const addNewSurrender = async () => {
    try {
      const response = await fetch("/api/v1/surrender", {
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

  const addNewAdoptablePet = async () => {
    try {
      const response = await fetch("/api/v1/adoptions", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newAdoptablePet)
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
    return _.isEmpty(submissionErrors)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validateInput()) {
      newAdoptablePet.name = newSurrender.petName
      newAdoptablePet.imgUrl = newSurrender.petImageUrl
      newAdoptablePet.age = newSurrender.petAge
      newAdoptablePet.vaccinationStatus = newSurrender.vaccinationStatus
      newAdoptablePet.adoptionStory = "just join form surrender department. (or should i add story column in surrender)"
      newAdoptablePet.adoptionStatus = "yes"
      newAdoptablePet.petType.id = newSurrender.petTypeId
      addNewSurrender()
      addNewAdoptablePet()
    }
  }

  if (submitSuccessful) {
    return (
      <SuccessfulSubmission submitSuccessful={submitSuccessful} userName={newSurrender.name} />
    )
  } else {
    return (
      <div id="surrender-form">
        <h2>Surrender Your Pet:</h2>
      <div className="surrender-form-container">
        <form onSubmit={handleSubmit} className="surrender-form-box">
          <div className="cell">
            <Error errors={errors}/>
          </div>
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
            <label htmlFor="petTypeId">
              Pet Type:
              <select
                  id="petTypeId"
                  name="petTypeId"
                  value={newSurrender.petType}
                  onChange={handleInput}
              >
                <option value="">Please Select</option>
                <option value="1">Puppies</option>
                <option value="2">Kitties</option>
              </select>
            </label>
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
            <label htmlFor="applicationStatus">
              <input
                  id="applicationStatus"
                  type="text"
                  name="applicationStatus"
                  defaultValue="pending" hidden
              />
            </label>

            <input id="surrender-btn" type="submit" value="Submit"/>
        </form>
      </div>
      </div>
    )
  }
}
export default SurrenderForm
