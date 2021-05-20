import React, {useState, useEffect} from "react"

const AdminAdoptionForm = props => {

  const [submitSuccessful, setSubmitSuccessful] = useState(null)
  const [awaitAdoptionForm, setAwaitAdoptionForm] = useState({})

  const getAnimalAdoptionForm = async () => {
    try {
      const animalId = props.petId
      const animalType = props.petType
      const response = await fetch(`/api/v1/pets/${animalType}/${animalId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      // setAnimal(responseBody.pet)
      setAwaitAdoptionForm(responseBody)
    } catch (err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getAnimalAdoptionForm()
  }, [])

  const handleApprove = (event) => {
    event.preventDefault()
    setSubmitSuccessful(true)
  }

  const handleDeny = (event) => {
    event.preventDefault()
    setSubmitSuccessful(false)
    console.log("Deny")
  }

  if (submitSuccessful) {
    return (
      <div >
        <div>
          <form onSubmit={handleApprove}>
            <label><strong>Name: </strong>{props.ownerName}</label><br/>
            <label><strong>Contact: </strong>{props.phoneNumber}</label><br/>
            <label><strong>Email: </strong>{props.email}</label><br/>
            <label><strong>Pet's name: </strong>{awaitAdoptionForm.name}</label><br/>
            <label><img className="images thumbnail" src={awaitAdoptionForm.imgUrl} ></img></label>
            <label><strong>Application status: </strong>APPROVED</label><br/><br/><hr/>
          </form>
        </div>
      </div>
    )
  } else if (submitSuccessful == false) {
    return (
        <div >
          <div>
            <form onSubmit={handleApprove}>
              <label><strong>Name: </strong>{props.ownerName}</label><br/>
              <label><strong>Contact: </strong>{props.phoneNumber}</label><br/>
              <label><strong>Email: </strong>{props.email}</label><br/>
              <label><strong>Pet's name: </strong>{awaitAdoptionForm.name}</label><br/>
              <label><img className="images thumbnail" src={awaitAdoptionForm.imgUrl} ></img></label>
              <label><strong>Application
                status: </strong>DENY</label><br/>
            </form>
          </div>
        </div>
    )
  } else {
    return (
        <div >
          <div>
            <form onSubmit={handleApprove}>
              <label><strong>Name: </strong>{props.ownerName}</label><br/>
              <label><strong>Contact: </strong>{props.phoneNumber}</label><br/>
              <label><strong>Email: </strong>{props.email}</label><br/>
              <label><strong>Application status: </strong>{props.applicationStatus}</label><br/>
              <label><strong>Pet's name: </strong>{awaitAdoptionForm.name}</label><br/>
              <label><img className="images thumbnail" src={awaitAdoptionForm.imgUrl} ></img></label>
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