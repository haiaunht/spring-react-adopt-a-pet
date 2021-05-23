import React from "react"

const SuccessfulSubmission = ({ userName }) => {
  return (
    <div className="in-process">
      <h2>
        Congratulations, <strong>{userName}</strong>! <br />
        <span>
          Your submission is <i>in process.</i>
        </span>
      </h2>
    </div>
  )
}

export default SuccessfulSubmission
