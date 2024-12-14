import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom' // Import useNavigate from react-router-dom
import InputField from './InputField.jsx'
import FormContainer from './FormContainer.jsx'
import SubmitButton from './SubmitButton.jsx'
import './login.css'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm()

  const password = watch('password')
  const navigate = useNavigate() // Initialize the navigate function

  const onSubmit = async (data) => {
    console.log('Form Data:', data)

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log('Response from server:', responseData)

        console.log('responseData', responseData)
        console.log('data', data)

        // Store username and other data in localStorage
        localStorage.setItem(
          'user',
          JSON.stringify({
            username: data.username,
            email: data.email,
            token: responseData.token,
            role: responseData.data.role,
          }),
        )

        // Redirect to the home page upon successful login
        navigate('/') // Navigate to the home page
      } else {
        console.error('Server error:', response.status)
        // Handle error from the server (authentication failure, etc.)
        alert('Login failed. Please check your credentials and try again.')
      }

      reset()
    } catch (error) {
      console.error('Error:', error)
      // Display an error message if there is an error during the fetch request
      alert('Something went wrong. Please try again later.')
    }
  }

  return (
    <FormContainer
      heading="Glad to See You Safe"
      actionText="Don't have an account?"
      actionLink="/register"
      actionLinkText="Register"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Added Username Field */}
        <InputField
          label="Username"
          type="text"
          placeholder="Enter your username"
          id="username"
          register={register}
          validation={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
          }}
          errorMessage={errors.username?.message}
        />

        <InputField
          label="Email"
          type="email"
          placeholder="Enter your Email"
          id="email"
          register={register}
          validation={{
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: 'Please enter a valid email address',
            },
          }}
          errorMessage={errors.email?.message}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          id="password"
          register={register}
          validation={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
            maxLength: {
              value: 20,
              message: 'Password cannot exceed 20 characters',
            },
            validate: {
              hasNumber: (value) =>
                /\d/.test(value) || 'Password must contain a number',
              hasUpperCase: (value) =>
                /[A-Z]/.test(value) ||
                'Password must contain an uppercase letter',
            },
          }}
          errorMessage={errors.password?.message}
        />

        {/* Confirm Password Input */}
        <InputField
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          id="confirmPassword"
          register={register}
          validation={{
            required: 'Please confirm your password',
            validate: {
              matchPassword: (value) =>
                value === password || 'Passwords do not match',
            },
          }}
          errorMessage={errors.confirmPassword?.message}
        />

        <SubmitButton text="Login" />
      </form>
    </FormContainer>
  )
}

export default Login
