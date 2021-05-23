import React, {useState, useEffect} from "react"
import UserEditSurrenderForm from "./UserEditSurrenderForm"

const PendingApplications = props => {
  const [surrenderForms, setSurrenderForms] = useState([])

  const fetchAllSurrender = async () => {
    try {
      const response = await fetch("/api/v1/admin/pending_applications")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      //console.log(body.content)
      setSurrenderForms(body.content)
    } catch (err) {
      console.log(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchAllSurrender()
  }, [])

  const allSurrenderForms = surrenderForms.map( form => {
    return (
      <UserEditSurrenderForm
        key={form.id}
        ownerName={form.name}
        phoneNumber={form.phoneNumber}
        email={form.email}
        homeStatus={form.homeStatus}
        applicationStatus={form.applicationStatus}
        surrender={form}
        typeId={form.petTypeId}
      />
    )
  })

  return (
    <div className="container">
      <div className="content">
        <div className="max-width-800">
          <h2>Your application status:</h2>
          {allSurrenderForms}
        </div>
      </div>
    </div>
  )
}

export default PendingApplications