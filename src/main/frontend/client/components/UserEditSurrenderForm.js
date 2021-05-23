import React, {useState, useEffect} from "react"
import EditSurrenderForm from "./EditSurrenderForm";

const UserEditSurrenderForm = props => {
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

  const removeAPetAfterApprovalOrDenial = async () => {
    const awaitPetId = props.surrender.id
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
  }

  const handleEdit = (event) => {
    event.preventDefault()
    setSubmitSuccessful(true)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    removeAPetAfterApprovalOrDenial()
    setSubmitSuccessful(false)
  }

  if (submitSuccessful) {
    return (
      <EditSurrenderForm
        key={props.id}
        surrender={props.surrender}
      />
    )
  } else if (submitSuccessful == false) {
    return (
      <div className="pet-box">
        <div className="pending-box">
          <form onSubmit={handleEdit}>
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
            <label><strong>Application status: DELETE</strong></label><br/>
            <a href="/pets" >Go to Home</a>
          </form>
        </div>
      </div>
    )
  } else {
    return (
      <div className="pet-box">
        <div className="pending-box">
          <form onSubmit={handleEdit}>
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
            <input className="approve" type="submit" value="Edit" />
          </form>

          <form className="deny-form">
            <input className="deny"  type="submit" value="Delete"
               onClick={() => {
                 const confirmBox = window.confirm("Are you really want to delete this application?")
                 if (confirmBox !== false) {
                   handleDelete(event)
                 }
               }}/>
          </form>
        </div>
      </div>
    )
  }
}

export default UserEditSurrenderForm