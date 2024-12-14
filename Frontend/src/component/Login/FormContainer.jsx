// FormContainer.js
import React from 'react'

const FormContainer = ({
  children,
  heading,
  actionText,
  actionLink,
  actionLinkText,
}) => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-heading">{heading}</h1>
        {children}
        <p className="login-register">
          {actionText} <a href={actionLink}>{actionLinkText}</a>
        </p>
      </div>
    </div>
  )
}

export default FormContainer
