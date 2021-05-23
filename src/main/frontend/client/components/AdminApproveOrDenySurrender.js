import React, {useState, useEffect} from "react"

const AdminApproveOrDenySurrender = props => {
  const [submitSuccessful, setSubmitSuccessful] = useState(null)
  const {applicationStatus, email,id, name,  petAge,  petImageUrl,petName,petTypeId,phoneNumber,vaccinationStatus} = props.surrender

  const [awaitApplication, setAwaitApplication]  = useState({
    name : petName,
    imgUrl : petImageUrl,
    age : petAge,
    vaccinationStatus: vaccinationStatus,
    adoptionStory : "just join from Surrender shelter",
    adoptionStatus : "null",
    petType: {id: petTypeId}
  })

  //if approved, add to adoptable_pets table => remove from surrender
  const addToPetsAfterApproval = async () => {
    try {
      const response = await fetch("/api/v1/admin", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(awaitApplication)
      })

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      console.log(awaitApplication)
      setSubmitSuccessful(true)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
      setSubmitSuccessful(false)
    }
    console.log("Approved")
  }

  //if denied, remove from surrender_pets table
  const removeAPetAfterApprovalOrDenial = async () => {
    const awaitPetId = props.surrender.id
    console.log(awaitPetId)
    try {
      const response = await fetch(`/api/v1/admin/delete/${awaitPetId}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(awaitApplication)
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
    console.log("Denied")
  }

  const handleApprove = (event) => {
    event.preventDefault()
    addToPetsAfterApproval()
    removeAPetAfterApprovalOrDenial()
    console.log(awaitApplication)
  }

  const handleDeny = (event) => {
    event.preventDefault()
    removeAPetAfterApprovalOrDenial()
    setSubmitSuccessful(false)
    console.log(awaitApplication)
    console.log("Deny")
  }

  if (submitSuccessful) {
    return (
        <div className="pet-box">
          <div className="pending-box">
            <form onSubmit={handleApprove}>
              <label htmlFor="imgUrl"></label>
              <img className="pet-img" src={props.surrender.petImageUrl} height={200} width={250}/><br/>
              <input name="imgUrl" value={props.surrender.petImageUrl} hidden/>
              <label><strong>Name: </strong>{props.ownerName}</label><br/>
              <label><strong>Contact: </strong>{props.phoneNumber}</label><br/>
              <label><strong>Email: </strong>{props.email}</label><br/>
              <label htmlFor="name"><strong>Pet's name: </strong>{props.surrender.petName}</label><br/>
              <input type="text" name="name" value={props.surrender.petName} hidden/>

              <label htmlFor="age"><strong>Pet's Age: </strong>{props.surrender.petAge}</label><br/>
              <input name="age" value={props.surrender.petAge} hidden/>
              <label><strong>Application status: APPROVED</strong></label><br/>
              <a href="/pets" >Go to Home</a>
            </form>
          </div>
        </div>
    )
  } else if (submitSuccessful == false) {
    return (
        <div className="pet-box">
          <div className="pending-box">
            <form onSubmit={handleApprove}>
              <label htmlFor="imgUrl"></label>
              <img src={props.surrender.petImageUrl} height={200} width={250}/><br/>
              <input name="imgUrl" value={props.surrender.petImageUrl} hidden/>
              <label><strong>Name: </strong>{props.ownerName}</label><br/>
              <label><strong>Contact: </strong>{props.phoneNumber}</label><br/>
              <label><strong>Email: </strong>{props.email}</label><br/>
              <label htmlFor="name"><strong>Pet's name: </strong>{props.surrender.petName}</label><br/>
              <input type="text" name="name" value={props.surrender.petName} hidden/>

              <label htmlFor="age"><strong>Pet's Age: </strong>{props.surrender.petAge}</label><br/>
              <input name="age" value={props.surrender.petAge} hidden/>
              <label><strong>Application status: DENY</strong></label><br/>
              <a href="/pets" >Go to Home</a>
            </form>
          </div>
        </div>
    )
  } else {
    return (
        <div className="pet-box">
          <div className="pending-box">
            <form onSubmit={handleApprove}>
              <label htmlFor="imgUrl"></label>
              <img src={props.surrender.petImageUrl} height={200} width={250}/><br/>
              <input name="imgUrl" value={props.surrender.petImageUrl} hidden/>
              <label><strong>Name: </strong>{props.ownerName}</label><br/>
              <label><strong>Contact: </strong>{props.phoneNumber}</label><br/>
              <label><strong>Email: </strong>{props.email}</label><br/>
              <label htmlFor="name"><strong>Pet's name: </strong>{props.surrender.petName}</label><br/>
              <input type="text" name="name" value={props.surrender.petName} hidden/>

              <label htmlFor="age"><strong>Pet's Age: </strong>{props.surrender.petAge}</label><br/>
              <input name="age" value={props.surrender.petAge} hidden/>
              <label><strong>Application status: </strong>{props.surrender.applicationStatus}</label><br/>

              <input className="approve" type="submit" value="Approve" />

            </form>
            <form onSubmit={handleDeny} className="deny-form">
              <input className="deny"  type="submit" value="Deny"/>
            </form>
          </div>
        </div>
    )
  }

}

export default AdminApproveOrDenySurrender