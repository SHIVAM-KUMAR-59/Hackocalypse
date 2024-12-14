import React from 'react'
import './login.css'

const Login = () => {
  return (
    <div className="container">
      <h1>Welcome Back</h1>
      <form action="/login" method="POST">
        <input
          type="text"
          name="username"
          placeholder="Username or Email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit" className="button">
          Login
        </button>
      </form>
      <div className="switch">
        Don't have an account? <a href="/signup">Sign Up</a>
      </div>
    </div>
  )
}

export default Login
