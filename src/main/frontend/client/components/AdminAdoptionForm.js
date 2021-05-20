import React, {useState, useEffect} from "react"

const AdminAdoptionForm = props => {
  console.log(props.form)
  const animalType = props.form.adoptablePet.petType.type
  console.log(animalType)
  const animalId = props.form.adoptablePet.id
  console.log(animalId)

  const [submitSuccessful, setSubmitSuccessful] = useState(null)
  const [awaitAdoptionForm, setAwaitAdoptionForm] = useState({
    name : props.ownerName,
    phoneNumber : props.phoneNumber,
    email : props.email,
    homeStatus: props.homeStatus,
    applicationStatus : props.applicationStatus,
    adoptablePet: {id:props.petId}
  })
  const[animalWithAdoptionForm, setAnimalWithAdoptionForm] = useState({
    name : "",
    imgUrl : "",
    age : "",
    vaccinationStatus: "",
    adoptionStory : "--",
    adoptionStatus : "false",
    petType: {id: props.form.adoptablePet.petType.id}
  })

  const getAnimalAdoptionForm = async () => {
    try {
      const response = await fetch(`/api/v1/pets/${animalType}/${animalId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      //setAwaitAdoptionForm(responseBody)
      console.log(responseBody)
      setAnimalWithAdoptionForm(responseBody)
      animalWithAdoptionForm.name = responseBody.name
      animalWithAdoptionForm.imgUrl = responseBody.imgUrl
      animalWithAdoptionForm.age = responseBody.age
      animalWithAdoptionForm.vaccinationStatus = responseBody.vaccinationStatus
      animalWithAdoptionForm.adoptionStory = responseBody.adoptionStory
      animalWithAdoptionForm.petType = responseBody.petType
      console.log(animalWithAdoptionForm)
      awaitAdoptionForm.adoptablePet = animalWithAdoptionForm
      console.log(awaitAdoptionForm)
    } catch (err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  const removeAPetAfterAdoptionApprovalFromApplication = async () => {
    const applicationId = props.id
    console.log(applicationId)
    try {
      const response = await fetch(`/api/v1/adoptions-applications/delete/${applicationId}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(awaitAdoptionForm)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      console.log("Adoption application approved. Remove from adoptable_applications")
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
      setSubmitSuccessful(false)
    }
  }

  //need to convert to adoptable_pets object to remove
  const removeAPetAfterAdoptionApproval = async () => {
    const animalId = props.petId
    console.log(animalId)
    try {
      const response = await fetch(`/api/v1/pets/delete/${animalId}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        // body: JSON.stringify(awaitAdoptionForm)
        body: JSON.stringify(animalWithAdoptionForm)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
      setSubmitSuccessful(false)
    }
    console.log("Adoption approved. Remove from adoptable_pets")
  }

  //need remove from adoptable_pets if approve for adoption
  //denied or null adoption status will stay in db

  useEffect(() => {
    getAnimalAdoptionForm()
  }, [props])

  const handleApprove = (event) => {
    event.preventDefault()
    removeAPetAfterAdoptionApprovalFromApplication()
    removeAPetAfterAdoptionApproval()
    setSubmitSuccessful(true)
  }

  const handleDeny = (event) => {
    event.preventDefault()
    setSubmitSuccessful(false)
    console.log("Deny")
  }

  if (submitSuccessful) {
    return (
        <div className="pet-box">
          <div >
          <form onSubmit={handleApprove}>
            <label><strong>Name: </strong>{props.ownerName}</label><br/>
            <label><strong>Contact: </strong>{props.phoneNumber}</label><br/>
            <label><strong>Email: </strong>{props.email}</label><br/>
            <label><strong>Pet's name: 555</strong>{animalWithAdoptionForm.name}</label><br/>
            <label><img className="images thumbnail" src={animalWithAdoptionForm.imgUrl} ></img></label>
            <label><strong>Application status: </strong>APPROVED</label><br/><br/><hr/>
          </form>
        </div>
      </div>
    )
  } else if (submitSuccessful == false) {
    return (
        <div className="pet-box">
          <div >
            <form onSubmit={handleDeny}>
              <label><strong>Name: </strong>{props.ownerName}</label><br/>
              <label><strong>Contact: </strong>{props.phoneNumber}</label><br/>
              <label><strong>Email: </strong>{props.email}</label><br/>
              <label><strong>Pet's name: 555</strong>{awaitAdoanimalWithAdoptionFormptionForm.name}</label><br/>
              <label><img className="images thumbnail" src={animalWithAdoptionForm.imgUrl} ></img></label>
              <label><strong>Application
                status: </strong>DENY</label><br/>
            </form>
          </div>
        </div>
    )
  } else {
    return (
        <div className="pet-box">
          <div >
            <form onSubmit={handleApprove}>
              <label><strong>Name: </strong>{props.ownerName}</label><br/>
              <label><strong>Contact: </strong>{props.phoneNumber}</label><br/>
              <label><strong>Email: </strong>{props.email}</label><br/>
              <label><strong>Application status: </strong>{props.applicationStatus}</label><br/>
              <label><strong>Pet's name: 555 </strong>{animalWithAdoptionForm.name}</label><br/>
              <label><img className="images thumbnail" src={animalWithAdoptionForm.imgUrl} ></img></label>
              <input type="submit" value="Approve" />

            </form>
            <form onSubmit={handleDeny}>
              <input type="submit" value="Deny"/>
            </form>
          </div>
        </div>
    )
  }

}

export default AdminAdoptionForm