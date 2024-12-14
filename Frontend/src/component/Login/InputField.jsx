import React from 'react'

const InputField = ({
  label,
  type,
  placeholder,
  id,
  register,
  validation,
  errorMessage,
}) => {
  return (
    <div className="login-form-group">
      <input
        type={type}
        className="login-input"
        placeholder={placeholder}
        id={id}
        {...register(id, validation)}
      />
      {errorMessage && <p className="login-error">{errorMessage}</p>}
    </div>
  )
}

export default InputField
