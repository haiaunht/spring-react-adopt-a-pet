import React, {useState, useEffect} from "react"

const AdminAdoptionForm = props => {
  const animalType = props.form.adoptablePet.petType.type
  const animalId = props.form.adoptablePet.id
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
    const applicationId = props.applicationId
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
      } else {
        const body = await response.json()
        console.log("Adoption application approved. Remove from adoptable_applications")
      }
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
      setSubmitSuccessful(false)
    }
    setSubmitSuccessful(true)
  }

  //need to convert to adoptable_pets object to remove
  const removeAPetAfterAdoptionApproval = async () => {
    console.log(animalWithAdoptionForm)
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
      } else {
        const body = await response.json()
      }
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
      setSubmitSuccessful(false)
    }
    setSubmitSuccessful(true)
    console.log("Adoption approved. Remove from adoptable_pets")
  }

  //need remove from adoptable_pets if approve for adoption
  //denied or null adoption status will stay in db

  useEffect(() => {
    getAnimalAdoptionForm()
  }, [])

  const handleApprove = (event) => {
    event.preventDefault()
    removeAPetAfterAdoptionApprovalFromApplication()
    removeAPetAfterAdoptionApproval()
  }

  const handleDeny = (event) => {
    event.preventDefault()
    setSubmitSuccessful(false)
    console.log("Deny")
  }

  if (submitSuccessful) {
    return (
        <div className="pet-box">
          <h1>Approved</h1>
          <div >
          <form onSubmit={handleApprove}>
            <label><strong>Name: </strong>{props.ownerName}</label><br/>
            <label><strong>Contact: </strong>{props.phoneNumber}</label><br/>
            <label><strong>Email: </strong>{props.email}</label><br/>
            <label><strong>Pet's name: </strong>{animalWithAdoptionForm.name}</label><br/>
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
              <label><strong>Pet's name: </strong>{animalWithAdoptionForm.name}</label><br/>
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
          <div className="pending-box">
            <form onSubmit={handleApprove}>
              <label><strong>Name: </strong>{props.ownerName}</label><br/>
              <label><strong>Contact: </strong>{props.phoneNumber}</label><br/>
              <label><strong>Email: </strong>{props.email}</label><br/>
              <label><strong>Application status: </strong>{props.applicationStatus}</label><br/>
              <label><strong>Pet's name:  </strong>{animalWithAdoptionForm.name}</label><br/>
              <label><img className="images thumbnail" src={animalWithAdoptionForm.imgUrl} ></img></label>
              <input className="approve" type="submit" value="Approve" />
            </form>
            <form onSubmit={handleDeny} className="deny-form">
              <input type="submit" className="deny" value="Deny"/>
            </form>
          </div>
        </div>
    )
  }

}

export default AdminAdoptionForm