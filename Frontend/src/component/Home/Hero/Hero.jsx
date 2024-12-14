import React from 'react'
import './hero.css'
import Admin from '../Admin/Admin'
import Resources from '../Resources/Resources'
import Community from '../Community/Community'

const Hero = () => {
  return (
    <main className="main-content">
      <h1>Welcome to the Crisis Hub</h1>
      <p>
        Your source for urgent updates, resources, and support during uncertain
        times.
      </p>

      <Admin />

      <Resources />

      <Community />
    </main>
  )
}

export default Hero
