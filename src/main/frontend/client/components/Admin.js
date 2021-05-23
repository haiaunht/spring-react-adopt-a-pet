import React, {useState, useEffect} from "react"
import AdminAdoptionForm from "./AdminAdoptionForm"

const Admin = props => {
  const [adoptForms, setAdoptForms] = useState([])

  const fetchAllForm = async () => {
    try {
      const response = await fetch("/api/v1/adoptions-applications")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setAdoptForms(body.content)
    } catch (err) {
      console.log(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchAllForm()
  }, [])

  const allAdoptForms = adoptForms.map( form => {
    return (
      <div>
        <AdminAdoptionForm
          key={form.id}
          applicationId={form.id}
          ownerName={form.name}
          phoneNumber={form.phoneNumber}
          email={form.email}
          homeStatus={form.homeStatus}
          applicationStatus={form.applicationStatus}
          form={form}
        />
      </div>
    )
  })


  return (
    <div className="container">
      <div className="content">
        <div className="max-width-800">
          <h1>Welcome, Admin!</h1>
          <h2>Adoption Form Awaits:</h2>
          {allAdoptForms}
        </div>
      </div>
    </div>
  )
}

export default Admin