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
      awaitAdoptionForm.adoptablePet = animalWithAdoptionForm
    } catch (err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  const updateApplicationStatis = async (status) => {
    const applicationId = props.applicationId
    if (status === "approved") {
      setSubmitSuccessful(true)
    } else if (status === "denied") {
      setSubmitSuccessful(false)
    }
    try {
      const response = await fetch(`/api/v1/adoptions-applications/update/${applicationId}/${status}`, {
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
      }
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const updatePetAdoptionStatus = async (status) => {
    try {
      const response = await fetch(`/api/v1/pets/update/${animalId}/${status}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
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
    }
  }

  useEffect(() => {
    getAnimalAdoptionForm()
  }, [])

  const handleApprove = (event) => {
    event.preventDefault()
    updatePetAdoptionStatus("approved")
    updateApplicationStatis("approved")
    setSubmitSuccessful(true)
  }

  const handleDeny = (event) => {
    event.preventDefault()
    updatePetAdoptionStatus("denied")
    updateApplicationStatis("denied")
    setSubmitSuccessful(false)
  }

  if (submitSuccessful) {
    return (
      <div className="pet-box">
        <h1>Approved</h1>
        <div className="pending-box">
        <form onSubmit={handleApprove}>
          <label><strong>Name: </strong>{props.ownerName}</label><br/>
          <label><strong>Contact: </strong>{props.phoneNumber}</label><br/>
          <label><strong>Email: </strong>{props.email}</label><br/>
          <label><strong>Application status: </strong>approved</label><br/>
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
        <h1>Denied</h1>
        <div className="pending-box">
          <form onSubmit={handleDeny}>
            <label><strong>Name: </strong>{props.ownerName}</label><br/>
            <label><strong>Contact: </strong>{props.phoneNumber}</label><br/>
            <label><strong>Email: </strong>{props.email}</label><br/>
            <label><strong>Application status: </strong>denied</label><br/>
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